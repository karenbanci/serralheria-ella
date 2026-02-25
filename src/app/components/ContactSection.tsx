import { motion } from "motion/react";
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useState } from "react";
import { RequestQuoteButton } from "./RequestQuoteButton";

export function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula envio do formulário
    setIsSubmitted(true);

    // Reseta o formulário após 3 segundos
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "(11) 98941-5518",
      link: "tel:+5511989415518",
    },
    {
      icon: Mail,
      title: "Email",
      value: "serralheriaella@gmail.com",
      link: "mailto:serralheriaella@gmail.com",
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "Localização em Breve",
      link: "#",
    },
  ];

  return (
    <section
      id="contato"
      className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-950 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-700/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Entre em <span className="text-red-700">Contato</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Estamos prontos para transformar seu projeto em realidade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-lg border border-red-900/20">
              <h3 className="text-2xl text-white mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-red-700/20 rounded-lg flex items-center justify-center group-hover:bg-red-700/30 transition-colors flex-shrink-0">
                      <info.icon size={24} className="text-red-700" />
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm">{info.title}</p>
                      <p className="text-white group-hover:text-red-700 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-lg border border-red-900/20">
            <h3 className="text-2xl text-white mb-4">Horário de Atendimento</h3>
            <div className="space-y-2 text-neutral-300">
              <p>Segunda a Segunda: 6h - 23h</p>
              <p className="text-red-400 text-sm mt-3">
                Atendimento todos os dias!
              </p>
              <RequestQuoteButton className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
