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

      const { data, error } = await supabase.from("portfolio").select("*");
      if (error) {
        console.error("Erro ao buscar projetos:", error);
      } else if (data) {
        setProjects(data);
      }
    }

    loadAdminData();
  }, [navigate]);

  function handleAddProject(newProject: Project) {
    setProjects((prev) => [...prev, newProject]);
  }

  async function handleRemoveProject(projectId: string | number) {
    const { error } = await supabase
      .from("portfolio")
      .delete()
      .eq("id", projectId);

    if (error) {
      alert("Erro ao remover projeto: " + error.message);
      return;
    }

    setProjects((prev) => prev.filter((project) => project.id !== projectId));
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
