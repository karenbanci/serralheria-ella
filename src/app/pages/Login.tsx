import React from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Exemplo correto para Vite

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/admin");
    }
  }

  return (
    <div className="min-h-screen  from-amber-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"></div>
          <h1 className="text-4xl md:text-5xl mb-4 text-white">
            Painel Administrativo
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Entre com suas credenciais para gerenciar o portfólio
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm text-slate-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm text-slate-700 mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-amber-700 hover:underline">
              Voltar para o site
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

// export const Login: React.FC = () => {
//   return (
//     <div className="min-h-[60vh] flex items-center justify-center text-white">
//       <div className="p-6 bg-neutral-900 rounded-lg shadow">
//         Página de login (placeholder)
//       </div>
//     </div>
//   );
// };
