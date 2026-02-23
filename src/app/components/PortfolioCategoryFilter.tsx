interface CategoryOption {
  id: string;
  label: string;
}

interface PortfolioCategoryFilterProps {
  categories: ReadonlyArray<CategoryOption>;
  activeCategory: string;
  onChangeCategory: (categoryId: string) => void;
}

export function PortfolioCategoryFilter({
  categories,
  activeCategory,
  onChangeCategory,
}: PortfolioCategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChangeCategory(category.id)}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${
            activeCategory === category.id
              ? "bg-red-700 text-white shadow-lg shadow-red-700/30"
              : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
