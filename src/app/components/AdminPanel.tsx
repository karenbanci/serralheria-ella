import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Edit2, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface AboutContent {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
}

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'about'>('portfolio');
  const [projects, setProjects] = useState<Project[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: '',
    subtitle: '',
    description1: '',
    description2: '',
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: '',
    image: '',
  });

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-294ae748`;

  // Load portfolio projects
  const loadProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/portfolio`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  // Load about content
  const loadAboutContent = async () => {
    try {
      const response = await fetch(`${API_URL}/about`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success && data.content) {
        setAboutContent(data.content);
      }
    } catch (error) {
      console.error('Error loading about content:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadProjects();
      loadAboutContent();
    }
  }, [isOpen]);

  // Add new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.category || !newProject.image) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const id = Date.now();
      const response = await fetch(`${API_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ ...newProject, id }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Projeto adicionado com sucesso!');
        setNewProject({ title: '', category: '', image: '' });
        loadProjects();
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Erro ao adicionar projeto');
    }
  };

  // Update project
  const handleUpdateProject = async () => {
    if (!editingProject) return;

    try {
      const response = await fetch(`${API_URL}/portfolio/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(editingProject),
      });

      const data = await response.json();
      if (data.success) {
        alert('Projeto atualizado com sucesso!');
        setEditingProject(null);
        loadProjects();
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Erro ao atualizar projeto');
    }
  };

  // Delete project
  const handleDeleteProject = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    try {
      const response = await fetch(`${API_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });

      const data = await response.json();
      if (data.success) {
        alert('Projeto excluído com sucesso!');
        loadProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Erro ao excluir projeto');
    }
  };

  // Update about content
  const handleUpdateAbout = async () => {
    try {
      const response = await fetch(`${API_URL}/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(aboutContent),
      });

      const data = await response.json();
      if (data.success) {
        alert('Conteúdo atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Error updating about content:', error);
      alert('Erro ao atualizar conteúdo');
    }
  };

  const categories = [
    { id: 'portoes', label: 'Portões' },
    { id: 'box', label: 'Box de Banheiro' },
    { id: 'escada', label: 'Escadas e Guarda-Corpos' },
    { id: 'fachadas', label: 'Fachadas' },
    { id: 'esquadrias', label: 'Esquadrias' },
  ];

  return (
    <>
      {/* Admin Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-700 hover:bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors"
        title="Painel Admin"
      >
        <Edit2 size={24} />
      </motion.button>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-2/3 bg-neutral-900 z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-white">Painel de Administração</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`px-6 py-3 rounded-lg transition-colors ${
                      activeTab === 'portfolio'
                        ? 'bg-red-700 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    Portfólio
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-6 py-3 rounded-lg transition-colors ${
                      activeTab === 'about'
                        ? 'bg-red-700 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    Sobre Nós
                  </button>
                </div>

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    {/* Add New Project */}
                    <div className="bg-neutral-800 p-6 rounded-lg">
                      <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                        <Plus size={20} /> Adicionar Novo Projeto
                      </h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Título do projeto"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject({ ...newProject, title: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-red-700 focus:outline-none"
                        />
                        <select
                          value={newProject.category}
                          onChange={(e) =>
                            setNewProject({ ...newProject, category: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-red-700 focus:outline-none"
                        >
                          <option value="">Selecione a categoria</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="URL da imagem"
                          value={newProject.image}
                          onChange={(e) =>
                            setNewProject({ ...newProject, image: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-red-700 focus:outline-none"
                        />
                        <button
                          onClick={handleAddProject}
                          className="w-full px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus size={20} /> Adicionar Projeto
                        </button>
                      </div>
                    </div>

                    {/* Existing Projects */}
                    <div className="space-y-4">
                      <h3 className="text-xl text-white">Projetos Existentes</h3>
                      {projects.length === 0 ? (
                        <p className="text-neutral-400">Nenhum projeto cadastrado</p>
                      ) : (
                        projects.map((project) => (
                          <div
                            key={project.id}
                            className="bg-neutral-800 p-4 rounded-lg"
                          >
                            {editingProject?.id === project.id ? (
                              <div className="space-y-4">
                                <input
                                  type="text"
                                  value={editingProject.title}
                                  onChange={(e) =>
                                    setEditingProject({
                                      ...editingProject,
                                      title: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:border-red-700 focus:outline-none"
                                />
                                <select
                                  value={editingProject.category}
                                  onChange={(e) =>
                                    setEditingProject({
                                      ...editingProject,
                                      category: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:border-red-700 focus:outline-none"
                                >
                                  {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                      {cat.label}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="text"
                                  value={editingProject.image}
                                  onChange={(e) =>
                                    setEditingProject({
                                      ...editingProject,
                                      image: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:border-red-700 focus:outline-none"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={handleUpdateProject}
                                    className="flex-1 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded transition-colors flex items-center justify-center gap-2"
                                  >
                                    <Save size={16} /> Salvar
                                  </button>
                                  <button
                                    onClick={() => setEditingProject(null)}
                                    className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded transition-colors"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-4">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="text-white font-semibold">
                                    {project.title}
                                  </h4>
                                  <p className="text-neutral-400 text-sm">
                                    {categories.find((c) => c.id === project.category)
                                      ?.label || project.category}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setEditingProject(project)}
                                    className="p-2 bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="p-2 bg-red-700 hover:bg-red-600 text-white rounded transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="bg-neutral-800 p-6 rounded-lg">
                    <h3 className="text-xl text-white mb-4">Editar Sobre Nós</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-neutral-300 mb-2">Título</label>
                        <input
                          type="text"
                          value={aboutContent.title}
                          onChange={(e) =>
                            setAboutContent({ ...aboutContent, title: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-red-700 focus:outline-none"
                          placeholder="Ex: Sobre Nós"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-300 mb-2">Subtítulo</label>
                        <textarea
                          value={aboutContent.subtitle}
                          onChange={(e) =>
                            setAboutContent({ ...aboutContent, subtitle: e.target.value })
                          }
                          rows={2}
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-red-700 focus:outline-none resize-none"
                          placeholder="Breve descrição da empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-300 mb-2">
                          Primeiro Parágrafo
                        </label>
                        <textarea
                          value={aboutContent.description1}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              description1: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-red-700 focus:outline-none resize-none"
                          placeholder="Primeiro parágrafo sobre a empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-300 mb-2">
                          Segundo Parágrafo
                        </label>
                        <textarea
                          value={aboutContent.description2}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              description2: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-red-700 focus:outline-none resize-none"
                          placeholder="Segundo parágrafo sobre a empresa"
                        />
                      </div>
                      <button
                        onClick={handleUpdateAbout}
                        className="w-full px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Save size={20} /> Salvar Alterações
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
