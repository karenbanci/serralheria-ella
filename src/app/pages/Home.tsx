import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { ContactSection } from "../components/ContactSection";

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("preview") === "portfolio") {
      setTimeout(() => {
        document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.search]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
};
