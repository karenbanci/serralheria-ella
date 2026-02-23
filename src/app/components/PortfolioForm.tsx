import { useState, useEffect } from "react";
import { X } from "lucide-react";
import supabase, { type PortfolioItem } from "../lib/supabase";

const categories = ["Portões", "Box", "Escadas", "Fachadas", "Esquadrias"];

interface PortfolioFormProps {
  onClose: () => void;
  onSave: (portfolio: PortfolioItem) => void;
}

export function PortfolioForm({ onClose, onSave }: PortfolioFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<string>(categories[0]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    // get current user name for display
    supabase.auth.getUser().then(({ data }) => {
      const user = data?.user;
      if (user) {
        const name =
          (user.user_metadata &&
            (user.user_metadata.full_name || user.user_metadata.name)) ||
          user.email ||
          null;
        setUserName(name);
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl: string | null = null;

      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `portfolio/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("portfolio-images")
          .upload(filePath, file, { cacheControl: "3600", upsert: false });

        // log upload response for debugging
        console.log("supabase upload response:", { uploadData, uploadError });

        if (uploadError) {
          // include any status/message details we can surface
          const msg = uploadError.message || JSON.stringify(uploadError);
          throw new Error(`Upload failed: ${msg}`);
        }

        const { data: publicData } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(filePath);

        imageUrl = publicData?.publicUrl ?? null;

        // If the bucket is private (no public URL), create a signed URL
        if (!imageUrl) {
          const expiresIn = 60 * 60 * 24 * 7; // 7 days
          const { data: signedData, error: signedError } =
            await supabase.storage
              .from("portfolio-images")
              .createSignedUrl(filePath, expiresIn);

          if (signedError) throw signedError;
          imageUrl = signedData?.signedUrl ?? signedData?.signedUrl ?? null;
        }
      }

      // Call server-side endpoint to insert row (server has Service Role Key)
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) {
        alert("Faça login antes de adicionar um projeto.");
        setLoading(false);
        return;
      }

      const res = await fetch("/make-server-294ae748/portfolio/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          image_url: imageUrl,
        }),
      });

      const result = await res.json();
      if (!result.success) {
        alert(
          "Erro ao salvar portfólio: " + (result.error || "erro desconhecido"),
        );
      } else {
        onSave(result.data);
        onClose();
      }
    } catch (err: any) {
      alert("Erro ao fazer upload da imagem: " + err.message);
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-1">Adicionar Projeto</h2>
        <div className="text-sm text-gray-600 mb-4">
          {userName ? `Logado como: ${userName}` : "Não autenticado"}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Imagem
          </label>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="mb-2 max-h-48 w-full object-contain rounded"
            />
          ) : (
            <div className="mb-2 h-48 w-full rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500 border">
              Sem imagem selecionada
            </div>
          )}

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files ? e.target.files[0] : null;
              // revoke previous preview
              if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
              }
              setFile(f);
              setPreviewUrl(f ? URL.createObjectURL(f) : null);
            }}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Salvando..." : "Salvar Projeto"}
        </button>
      </form>
    </div>
  );
}

// NOTE: bucket checks / server-side admin actions should run on the server.
// Removed client-side creation using `process.env` to avoid ReferenceError in browser.
