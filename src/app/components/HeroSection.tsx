import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { HashLink } from "react-router-hash-link";

export function HeroSection() {
  const MotionHashLink = motion(HashLink);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1651420952022-2d2e666e87df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGdsYXNzJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NjU5NDQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Fachada moderna em vidro e alumínio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/90 via-neutral-950/85 to-red-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4 px-6 py-2 bg-red-700/30 border border-red-700 rounded-full text-red-400"
          >
            Excelência em Alumínio e Vidro
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 text-white"
          >
            Seja Bem-Vindo à
            <br />
            <span className="text-red-700">Serralheria ELLA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-8"
          >
            Especialistas em soluções de alumínio e vidro para projetos
            residenciais, comerciais e obras de alto padrão.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MotionHashLink
              key="whatsapp-link"
              to="https://wa.me/5511989415518?text=Olá%2C%20gostaria%20de%20solicitar%20um%20orçamento"
              smooth
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              target="_blank"
              className="px-8 py-4 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Solicite um Orçamento
            </MotionHashLink>

            <MotionHashLink
              key="whatsapp-link"
              to="/#portfolio"
              smooth
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-neutral-950 text-white rounded-lg transition-all duration-300"
            >
              Portfólio
            </MotionHashLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="/#sobre">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={32} className="text-white cursor-pointer" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
