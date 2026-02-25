import { motion } from "motion/react";

interface RequestQuoteButtonProps {
  className?: string;
}

const WHATSAPP_QUOTE_URL =
  "https://wa.me/5511989415518?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento";

export function RequestQuoteButton({
  className = "",
}: RequestQuoteButtonProps) {
  return (
    <motion.a
      href={WHATSAPP_QUOTE_URL}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block px-8 py-4 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${className}`}
    >
      Solicite um Orçamento
    </motion.a>
  );
}
