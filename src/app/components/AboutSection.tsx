import { motion } from 'motion/react';
import { Shield, Award, Users } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function AboutSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [content, setContent] = useState({
    title: 'Sobre Nós',
    subtitle: 'A Serralheria ELLA é especialista em soluções de alumínio e vidro para projetos residenciais, comerciais e obras de alto padrão.',
    description1: 'Atuamos em parceria com a Serralheria Kalumínios, referência em qualidade, precisão e acabamento no mercado.',
    description2: 'Nossa equipe une técnica, criatividade e compromisso com a excelência. Trabalhamos com processos bem estruturados, desde o entendimento das necessidades do cliente até o desenvolvimento de soluções sob medida que garantem funcionalidade, segurança e estética.',
  });

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-294ae748`;

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`${API_URL}/about`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const data = await response.json();
        if (data.success && data.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error('Error loading about content:', error);
      }
    };

    loadContent();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Qualidade Garantida',
      description: 'Referência em qualidade, precisão e acabamento em todas as etapas do projeto.',
    },
    {
      icon: Award,
      title: 'Alto Padrão',
      description: 'Projetos residenciais, comerciais e obras de alto padrão com acabamento impecável.',
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Profissionais qualificados que unem técnica, criatividade e compromisso.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-neutral-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            {content.title}
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1715156153744-d5fd2f1f66eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwZ2xhc3MlMjBmYWNhZGUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjU5NDQ3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Projeto comercial"
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-neutral-300 text-lg leading-relaxed">
              {content.description1}
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed">
              {content.description2}
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Fale Conosco
              </a>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-lg border border-red-900/20 hover:border-red-700/50 transition-all duration-300 group"
            >
              <div className="mb-4 w-16 h-16 bg-red-700/20 rounded-lg flex items-center justify-center group-hover:bg-red-700/30 transition-colors">
                <feature.icon size={32} className="text-red-700" />
              </div>
              <h3 className="text-2xl mb-3 text-white">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}