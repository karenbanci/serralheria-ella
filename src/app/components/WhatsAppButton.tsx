// button whatsapp
import React from "react";
import whatsappIcon from "../images/whatsapp.svg";

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    window.open(
      "https://wa.me/5511989415518?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento",
      "_blank",
    );
  };

  return (
    <img
      src={whatsappIcon}
      alt="WhatsApp"
      style={{
        width: "50px",
        height: "50px",
        display: "block",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        zIndex: 1000,
      }}
      onClick={handleClick}
      aria-label="Abrir WhatsApp"
    />
  );
};
