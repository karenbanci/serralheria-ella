import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import { WhatsAppButton } from "./components/WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminPanel />
    </div>
  );
}
