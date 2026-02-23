export const PORTFOLIO_CATEGORY_OPTIONS = [
  { id: "all", label: "Todos" },
  { id: "portoes", label: "Portões" },
  { id: "box", label: "Box de Banheiro" },
  { id: "escada", label: "Escadas e Guarda-Corpos" },
  { id: "fachadas", label: "Fachadas" },
  { id: "esquadrias", label: "Esquadrias" },
] as const;

export const PORTFOLIO_FORM_CATEGORIES = PORTFOLIO_CATEGORY_OPTIONS.filter(
  (category) => category.id !== "all",
).map((category) => {
  // if (category.id === "box") return "Box";
  // if (category.id === "escada") return "Escadas";
  return category.label;
});

export function normalizePortfolioCategory(rawCategory: string) {
  const value = (rawCategory || "").toLowerCase();

  if (value.includes("port")) return "portoes";
  if (value.includes("box")) return "box";
  if (value.includes("escad") || value.includes("guarda")) return "escada";
  if (value.includes("fach")) return "fachadas";
  if (value.includes("esquad")) return "esquadrias";
  return value;
}
