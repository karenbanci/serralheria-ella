interface DashboardReturnButtonProps {
  isLoggedIn: boolean;
  onClick: () => void;
}

export function DashboardReturnButton({
  isLoggedIn,
  onClick,
}: DashboardReturnButtonProps) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    >
      Voltar para o Dashboard
    </button>
  );
}
