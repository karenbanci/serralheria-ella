import { useState } from "react";
import { PortfolioProjectsGrid } from "./PortfolioProjectsGrid";
import { PortfolioCategoryFilter } from "./PortfolioCategoryFilter";
import {
  PORTFOLIO_CATEGORY_OPTIONS,
  normalizePortfolioCategory,
} from "../constants/portfolioCategories";

interface Project {
  id: string | number;
  title: string;
  category: string;
  image_url: string;
}

interface AdminPortfolioGridProps {
  projects: Project[];
  showPreview: boolean;
  onRemoveProject: (projectId: string | number) => void;
}

export function AdminPortfolioGrid({
  projects,
  showPreview,
  onRemoveProject,
}: AdminPortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  if (showPreview) {
    const previewProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      category: normalizePortfolioCategory(project.category),
      image: project.image_url,
      rawCategory: project.category,
    }));

    const filteredPreviewProjects =
      activeCategory === "all"
        ? previewProjects
        : previewProjects.filter(
            (project) => project.category === activeCategory,
          );

    return (
      <div>
        <h2 className="text-2xl font-bold text-white my-10 flex justify-center">
          Preview do Portfólio
        </h2>
        <PortfolioCategoryFilter
          categories={PORTFOLIO_CATEGORY_OPTIONS}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
        />
        <PortfolioProjectsGrid
          projects={filteredPreviewProjects}
          categories={PORTFOLIO_CATEGORY_OPTIONS}
          isInView={true}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border border-slate-700 bg-slate-900/60 rounded-lg p-4"
        >
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-48 object-cover rounded mb-3"
          />
          <h2 className="text-xl font-semibold text-white">{project.title}</h2>
          <p className="text-gray-300 mb-3">{project.category}</p>
          <button
            onClick={() => onRemoveProject(project.id)}
            className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Remover Projeto
          </button>
        </div>
      ))}
    </div>
  );
}
