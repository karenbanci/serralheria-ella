import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { PortfolioForm } from "./PortfolioForm";
import { AdminPortfolioGrid } from "./AdminPortfolioGrid";
import { useNavigate } from "react-router";

interface Project {
  id: string | number;
  title: string;
  category: string;
  image_url: string;
}

export function AdminPanel() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [userDisplay, setUserDisplay] = useState("Usuário");

  async function fetchProjects() {
    const { data, error } = await supabase.from("portfolio").select("*");
    if (error) {
      console.error("Erro ao buscar projetos:", error);
      return;
    }

    setProjects(data ?? []);
  }

  useEffect(() => {
    async function loadAdminData() {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData?.user;

      if (!currentUser) {
        navigate("/login");
        return;
      }

      const displayName =
        currentUser.user_metadata?.full_name ||
        currentUser.user_metadata?.name ||
        currentUser.email?.split("@")[0] ||
        "Usuário";
      setUserDisplay(displayName);

      await fetchProjects();
    }

    loadAdminData();
  }, [navigate]);

  function handleAddProject(newProject: Project) {
    setProjects((prev) => [...prev, newProject]);
  }

  async function handleRemoveProject(projectId: string | number) {
    const normalizedProjectId = String(projectId);
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;

    if (!accessToken) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }

    const baseUrl = import.meta.env.VITE_SUPABASE_URL;
    const functionUrls = [
      `${baseUrl}/functions/v1/make-server-294ae748/portfolio/db/${normalizedProjectId}`,
      `${baseUrl}/functions/v1/server/make-server-294ae748/portfolio/db/${normalizedProjectId}`,
    ];

    let lastErrorMessage = "HTTP 404";
    let removed = false;

    for (const functionUrl of functionUrls) {
      const response = await fetch(functionUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        removed = true;
        break;
      }

      const serverMessage = result?.error
        ? String(result.error)
        : `HTTP ${response.status}`;
      lastErrorMessage = serverMessage;

      if (response.status !== 404) {
        break;
      }
    }

    if (!removed) {
      alert("Erro ao remover projeto: " + lastErrorMessage);
      return;
    }

    setProjects((prev) =>
      prev.filter((project) => String(project.id) !== normalizedProjectId),
    );
    await fetchProjects();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  function handlePreview() {
    setShowPreview((prev) => !prev);
  }

  return (
    <div className="px-6 pt-[20vh] pb-6 md:p-8 md:pt-[20vh] max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">
          Bem-vindo @{userDisplay}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Adicionar Projeto
          </button>
          <button
            onClick={handlePreview}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            {showPreview ? "Fechar Preview" : "Preview"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <PortfolioForm
          onClose={() => setShowForm(false)}
          onSave={handleAddProject}
        />
      )}

      <AdminPortfolioGrid
        projects={projects}
        showPreview={showPreview}
        onRemoveProject={handleRemoveProject}
      />
    </div>
  );
}
