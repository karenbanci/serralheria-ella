import { motion } from "motion/react";

interface PortfolioProject {
  id: string | number;
  title: string;
  category: string;
  image: string;
  rawCategory?: string;
}

interface CategoryOption {
  id: string;
  label: string;
}

interface PortfolioProjectsGridProps {
  projects: PortfolioProject[];
  categories: ReadonlyArray<CategoryOption>;
  isInView: boolean;
}

export function PortfolioProjectsGrid({
  projects,
  categories,
  isInView,
}: PortfolioProjectsGridProps) {
  return (
    <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          layout
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-neutral-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <h3 className="text-xl text-white mb-2">{project.title}</h3>
              <p className="text-red-400 text-sm">
                {categories.find((c) => c.id === project.category)?.label ||
                  project.rawCategory ||
                  project.category}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
