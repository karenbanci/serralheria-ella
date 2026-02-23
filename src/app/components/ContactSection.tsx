import { motion } from "motion/react";
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    message: string;
  } | null>(null);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-294ae748`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ ...formData, website: "" }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Falha ao enviar mensagem.");
      }

      setLastSubmittedData(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro inesperado ao enviar.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "5511989415518";
  const whatsappText = lastSubmittedData
    ? `Olá! Sou ${lastSubmittedData.name}. Acabei de enviar uma mensagem pelo site. Meu telefone é ${lastSubmittedData.phone}.`
    : "Olá! Vim pelo site da Serralheria ELLA.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-neutral-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-red-700 focus:outline-none text-white transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-red-700 focus:outline-none text-white transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-neutral-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-red-700 focus:outline-none text-white transition-colors"
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-neutral-300 mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-red-700 focus:outline-none text-white transition-colors resize-none"
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>

            {isSubmitted && (
              <div className="mt-4 text-center">
                <CheckCircle
                  size={24}
                  className="text-green-500 inline-block mr-2"
                />
                <p className="text-green-500">
                  Mensagem enviada! Entraremos em contato em breve.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                >
                  Enviar também no WhatsApp
                </a>
              </div>
            )}

            {submitError && (
              <div className="mt-4 text-center text-red-400">{submitError}</div>
            )}
          </motion.div>

          {/* Contact Info */}
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

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-lg border border-red-900/20">
              <h3 className="text-2xl text-white mb-4">
                Horário de Atendimento
              </h3>
              <div className="space-y-2 text-neutral-300">
                <p>Segunda a Segunda: 6h - 23h</p>
                <p className="text-red-400 text-sm mt-3">
                  Atendimento todos os dias!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
