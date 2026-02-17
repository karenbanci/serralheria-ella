import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export function TestimonialsSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const testimonials = [
    {
      id: 1,
      name: 'Ricardo Oliveira',
      role: 'Empresário',
      text: 'Excelente trabalho! A Serralheria ELLA transformou meu projeto comercial com soluções modernas e acabamento impecável. Recomendo!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Maria Santos',
      role: 'Arquiteta',
      text: 'Profissionalismo e qualidade incomparáveis. A equipe entendeu perfeitamente minhas necessidades e entregou um resultado que superou expectativas.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Carlos Mendes',
      role: 'Proprietário',
      text: 'Trabalho preciso, pontual e com ótimo custo-benefício. O guarda-corpo de vidro ficou espetacular em minha residência!',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-neutral-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            O Que Dizem Nossos <span className="text-red-700">Clientes</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Confira os depoimentos de quem confiou em nosso trabalho.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-lg border border-red-900/20 hover:border-red-700/50 transition-all duration-300 relative"
            >
              <div className="absolute top-6 right-6 text-red-700/20">
                <Quote size={48} />
              </div>

              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-red-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-neutral-300 mb-6 leading-relaxed">"{testimonial.text}"</p>

              <div>
                <p className="text-white">{testimonial.name}</p>
                <p className="text-red-700 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
