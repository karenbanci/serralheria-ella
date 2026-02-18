import { motion } from "motion/react";
import { HashLink } from "react-router-hash-link";

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl mb-4">
              <span className="text-white">Serralheria</span>{" "}
              <span className="text-red-700">ELLA</span>
            </div>
            <p className="text-neutral-400">
              Especialistas em soluções de alumínio e vidro com excelência e
              qualidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white mb-4">Links Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <a
                href="/"
                className="text-neutral-400 hover:text-red-700 transition-colors"
              >
                Início
              </a>
              <HashLink
                smooth
                to="#sobre"
                className="text-neutral-400 hover:text-red-700 transition-colors"
              >
                Sobre Nós
              </HashLink>
              <HashLink
                smooth
                to="#portfolio"
                className="text-neutral-400 hover:text-red-700 transition-colors"
              >
                Portfólio
              </HashLink>
              <HashLink
                smooth
                to="#contato"
                className="text-neutral-400 hover:text-red-700 transition-colors"
              >
                Contato
              </HashLink>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4">Serviços</h3>
            <ul className="flex flex-col gap-2 text-neutral-400">
              <li>Fachadas de Vidro</li>
              <li>Esquadrias de Alumínio</li>
              <li>Guarda-Corpos</li>
              <li>Box de Banheiro</li>
              <li>Portas e Janelas</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-900 pt-8 text-center">
          <p className="text-neutral-400">
            © {new Date().getFullYear()} Serralheria ELLA. Todos os direitos
            reservados.
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            Em parceria com Serralheria Kalumínios
          </p>
        </div>
      </div>
    </footer>
  );
}
