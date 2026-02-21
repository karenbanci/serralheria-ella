import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { PortfolioForm } from "./PortfolioForm";

interface Project {
  id: string | number;
  title: string;
  category: string;
  image_url: string;
}

export function AdminPanel() {
  console.log("AdminPanel renderizado");

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("portfolio").select("*");
      if (error) {
        console.error("Erro ao buscar projetos:", error);
      } else if (data) {
        setProjects(data);
      }
    }

    fetchProjects();
  }, []);

  function handleAddProject(newProject: Project) {
    setProjects((prev) => [...prev, newProject]);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Adicionar Projeto
      </button>
      {showForm && (
        <PortfolioForm
          onClose={() => setShowForm(false)}
          onSave={handleAddProject}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded p-4">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
