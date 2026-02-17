import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function PortfolioSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-294ae748`;

  // Load projects from database
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/portfolio`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const data = await response.json();
        if (data.success && data.projects.length > 0) {
          setProjects(data.projects);
        } else {
          // Use default projects if database is empty
          setProjects(getDefaultProjects());
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects(getDefaultProjects());
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const getDefaultProjects = () => [
    // Portões - 7 fotos
    {
      id: 1,
      title: 'Portão de Alumínio e Vidro Moderno',
      category: 'portoes',
      image: 'https://images.unsplash.com/photo-1727688404012-a13d02d9fa9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGdsYXNzJTIwZ2F0ZSUyMGVudHJhbmNlfGVufDF8fHx8MTc3MTAxNTA0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      title: 'Portão Metálico Contemporâneo',
      category: 'portoes',
      image: 'https://images.unsplash.com/photo-1765160602575-b50b54ff3a69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZXRhbCUyMGdhdGUlMjBkZXNpZ258ZW58MXx8fHwxNzcxMDE1MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      title: 'Portão Residencial em Alumínio',
      category: 'portoes',
      image: 'https://images.unsplash.com/photo-1769970916008-39ca7e369afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGVudHJhbmNlJTIwZ2F0ZSUyMHJlc2lkZW50aWFsfGVufDF8fHx8MTc3MTAxNTA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 4,
      title: 'Portão de Entrada Elegante',
      category: 'portoes',
      image: 'https://images.unsplash.com/photo-1634579471040-1de4c97c71d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBnYXRlJTIwYWx1bWludW18ZW58MXx8fHwxNzcxMDE1MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 5,
      title: 'Portão Premium de Luxo',
      category: 'portoes',
      image: 'https://images.unsplash.com/photo-1708180582928-5f26d3ccda7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnYXRlJTIwZW50cmFuY2UlMjBjb250ZW1wb3Jhcnl8ZW58MXx8fHwxNzcxMDE1MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 6,
      title: 'Portão de Alumínio Minimalista',
      category: 'portoes',
      image: 'https://images.unsplash.com/photo-1636345941675-6ac21374c5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhbHVtaW51bSUyMGdhdGUlMjBlbnRyYW5jZXxlbnwxfHx8fDE3NzEwMTQ4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 7,
      title: 'Portão Comercial Moderno',
      category: 'portoes',
      image: 'https://images.unsplash.com/photo-1727688404012-a13d02d9fa9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGdsYXNzJTIwZ2F0ZSUyMGVudHJhbmNlfGVufDF8fHx8MTc3MTAxNTA0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    
    // Box de Banheiro - 7 fotos
    {
      id: 8,
      title: 'Box de Vidro Temperado',
      category: 'box',
      image: 'https://images.unsplash.com/photo-1760067537877-dd4d2722c649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHNob3dlciUyMGVuY2xvc3VyZSUyMG1vZGVybnxlbnwxfHx8fDE3NzEwMTUwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 9,
      title: 'Box Frameless Elegante',
      category: 'box',
      image: 'https://images.unsplash.com/photo-1669825009759-0a4a52399533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFtZWxlc3MlMjBnbGFzcyUyMHNob3dlciUyMGRvb3J8ZW58MXx8fHwxNzcxMDE1MDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 10,
      title: 'Divisória de Vidro para Banheiro',
      category: 'box',
      image: 'https://images.unsplash.com/photo-1630699144565-a42d8db6da02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGdsYXNzJTIwcGFydGl0aW9ufGVufDF8fHx8MTc3MTAxNTA0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 11,
      title: 'Box de Luxo em Vidro',
      category: 'box',
      image: 'https://images.unsplash.com/photo-1759223607861-f0ef3e617739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGdsYXNzJTIwc2hvd2VyfGVufDF8fHx8MTc3MTAxNTA0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 12,
      title: 'Box Contemporâneo Minimalista',
      category: 'box',
      image: 'https://images.unsplash.com/photo-1765766600805-e75c44124d2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG93ZXIlMjBnbGFzcyUyMGRvb3IlMjBjb250ZW1wb3Jhcnl8ZW58MXx8fHwxNzcxMDE1MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 13,
      title: 'Box de Vidro Transparente',
      category: 'box',
      image: 'https://images.unsplash.com/photo-1763485956343-61b0163a3e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHNob3dlciUyMGRlc2lnbiUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcxMDE1MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 14,
      title: 'Box Personalizado com Perfil de Alumínio',
      category: 'box',
      image: 'https://images.unsplash.com/photo-1760067537877-dd4d2722c649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHNob3dlciUyMGVuY2xvc3VyZSUyMG1vZGVybnxlbnwxfHx8fDE3NzEwMTUwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    
    // Escadas e Guarda-Corpos - 7 fotos
    {
      id: 15,
      title: 'Guarda-Corpo de Vidro para Escada',
      category: 'escada',
      image: 'https://images.unsplash.com/photo-1757372429720-040d99458898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHN0YWlyY2FzZSUyMHJhaWxpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzcxMDE0ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 16,
      title: 'Balaustrada Contemporânea em Vidro',
      category: 'escada',
      image: 'https://images.unsplash.com/photo-1762545476224-52cb9c8a158b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGJhbHVzdHJhZGUlMjBjb250ZW1wb3Jhcnl8ZW58MXx8fHwxNzcxMDE1MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 17,
      title: 'Corrimão de Vidro e Alumínio',
      category: 'escada',
      image: 'https://images.unsplash.com/photo-1764460179145-06e2bf4d503d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGdsYXNzJTIwaGFuZHJhaWx8ZW58MXx8fHwxNzcxMDE1MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 18,
      title: 'Guarda-Corpo para Sacada',
      category: 'escada',
      image: 'https://images.unsplash.com/photo-1764428950485-89462b447f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGJhbGNvbnklMjByYWlsaW5nJTIwbW9kZXJufGVufDF8fHx8MTc3MTAxNTA0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 19,
      title: 'Guarda-Corpo Frameless',
      category: 'escada',
      image: 'https://images.unsplash.com/photo-1695624825974-96fa958f2be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFtZWxlc3MlMjBnbGFzcyUyMHJhaWxpbmclMjBzdGFpcmNhc2V8ZW58MXx8fHwxNzcxMDE1MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 20,
      title: 'Proteção de Vidro Moderna',
      category: 'escada',
      image: 'https://images.unsplash.com/photo-1765696300682-db0028ab06bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMGd1YXJkcmFpbCUyMGRlc2lnbnxlbnwxfHx8fDE3NzEwMTUwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 21,
      title: 'Guarda-Corpo de Luxo para Interiores',
      category: 'escada',
      image: 'https://images.unsplash.com/photo-1758901810612-55ba2c317a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHJhaWxpbmclMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzEwMTUwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    
    // Fachadas - 7 fotos
    {
      id: 22,
      title: 'Fachada de Vidro Moderna',
      category: 'fachadas',
      image: 'https://images.unsplash.com/photo-1715156153744-d5fd2f1f66eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGZhY2FkZSUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc3MDk4ODM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 23,
      title: 'Pele de Vidro em Alumínio',
      category: 'fachadas',
      image: 'https://images.unsplash.com/photo-1613744095894-cc7eac914a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGN1cnRhaW4lMjB3YWxsJTIwZmFjYWRlfGVufDF8fHx8MTc3MTAxNTA0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 24,
      title: 'Fachada Comercial em Vidro',
      category: 'fachadas',
      image: 'https://images.unsplash.com/photo-1768528385025-9aa7ab604ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3IlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxMDE1MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 25,
      title: 'Vitrine em Vidro e Alumínio',
      category: 'fachadas',
      image: 'https://images.unsplash.com/photo-1759421965457-c5a8463b8b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMHN0b3JlZnJvbnQlMjBjb21tZXJjaWFsfGVufDF8fHx8MTc3MTAxNTA0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 26,
      title: 'Fachada Arquitetônica Contemporânea',
      category: 'fachadas',
      image: 'https://images.unsplash.com/photo-1650906281370-ede40b60f02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGdsYXNzJTIwZmFjYWRlJTIwZGVzaWdufGVufDF8fHx8MTc3MTAxNTA0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 27,
      title: 'Fachada Envidraçada Premium',
      category: 'fachadas',
      image: 'https://images.unsplash.com/photo-1715156153744-d5fd2f1f66eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBidWlsZGluZyUyMGdsYXNzJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcxMDE1MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 28,
      title: 'Revestimento de Fachada em Alumínio e Vidro',
      category: 'fachadas',
      image: 'https://images.unsplash.com/photo-1613744095894-cc7eac914a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGN1cnRhaW4lMjB3YWxsJTIwZmFjYWRlfGVufDF8fHx8MTc3MTAxNTA0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    
    // Esquadrias - 7 fotos
    {
      id: 29,
      title: 'Esquadria de Alumínio Premium',
      category: 'esquadrias',
      image: 'https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMHdpbmRvdyUyMGZyYW1lcyUyMG1vZGVybnxlbnwxfHx8fDE3NzEwMTQ4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 30,
      title: 'Porta de Vidro com Perfil de Alumínio',
      category: 'esquadrias',
      image: 'https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGRvb3IlMjBhbHVtaW51bSUyMGZyYW1lfGVufDF8fHx8MTc3MTAxNTA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 31,
      title: 'Janela Moderna de Alumínio',
      category: 'esquadrias',
      image: 'https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aW5kb3clMjBkZXNpZ24lMjBhbHVtaW51bXxlbnwxfHx8fDE3NzEwMTUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 32,
      title: 'Porta de Correr em Vidro e Alumínio',
      category: 'esquadrias',
      image: 'https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGlkaW5nJTIwZ2xhc3MlMjBkb29yJTIwYWx1bWludW18ZW58MXx8fHwxNzcxMDE1MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 33,
      title: 'Esquadria Contemporânea',
      category: 'esquadrias',
      image: 'https://images.unsplash.com/photo-1768425237744-c25411b14e98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjB3aW5kb3clMjBmcmFtZXMlMjBnbGFzc3xlbnwxfHx8fDE3NzEwMTUwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 34,
      title: 'Porta de Alumínio e Vidro',
      category: 'esquadrias',
      image: 'https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMGdsYXNzJTIwZG9vciUyMG1vZGVybnxlbnwxfHx8fDE3NzEwMTUwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 35,
      title: 'Porta de Vidro Temperado com Alumínio',
      category: 'esquadrias',
      image: 'https://images.unsplash.com/photo-1762012591496-e9f42d84fa1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHBhbmVsJTIwZG9vciUyMGNvbnRlbXBvcmFyeXxlbnwxfHx8fDE3NzEwMTUwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'portoes', label: 'Portões' },
    { id: 'box', label: 'Box de Banheiro' },
    { id: 'escada', label: 'Escadas e Guarda-Corpos' },
    { id: 'fachadas', label: 'Fachadas' },
    { id: 'esquadrias', label: 'Esquadrias' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-neutral-950 to-neutral-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-700/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Nosso <span className="text-red-700">Portfólio</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos realizados com excelência e dedicação.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              layout
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-neutral-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-xl text-white mb-2">{project.title}</h3>
                  <p className="text-red-400 text-sm">
                    {categories.find((c) => c.id === project.category)?.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}