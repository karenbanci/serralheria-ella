# Serralheria ELLA - Site Profissional

Site profissional e interativo da Serralheria ELLA, especializada em soluções de alumínio e vidro para projetos residenciais, comerciais e de alto padrão, em parceria com a Serralheria Kalumínios.

## 🚀 Recursos

- ✨ Design moderno com paleta carmim escuro (vermelho profundo)
- 🎨 Animações suaves com Motion (Framer Motion)
- 📱 Totalmente responsivo
- 🖼️ Portfólio com 5 categorias de projetos
- 📧 Formulário de contato funcional
- 🔧 Painel de administração integrado
- 💾 Backend com Supabase

## 🎯 Serviços Destacados

- Portões
- Box de Banheiro
- Escadas e Guarda-Corpos
- Fachadas
- Esquadrias

## 📋 Pré-requisitos

- Node.js 20+
- pnpm 8+
- Conta no Supabase (gratuita)

## 🛠️ Instalação Local

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/serralheria-ella.git

# Entre na pasta
cd serralheria-ella

# Instale as dependências
pnpm install

# Execute localmente
pnpm dev
```

## 🌐 Deploy no GitHub Pages

### Passo 1: Configurar o Repositório

1. Crie um repositório no GitHub (ex: `serralheria-ella`)
2. Faça push do código:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/serralheria-ella.git
git push -u origin main
```

### Passo 2: Ajustar a Base URL

No arquivo `vite.config.ts`, ajuste a linha 9:

```typescript
base: process.env.GITHUB_PAGES ? '/NOME-DO-SEU-REPO/' : '/',
```

Substitua `NOME-DO-SEU-REPO` pelo nome exato do seu repositório GitHub.

**Exemplo:** Se seu repo é `serralheria-ella`, use:
```typescript
base: process.env.GITHUB_PAGES ? '/serralheria-ella/' : '/',
```

**Se for um repositório de usuário** (username.github.io), use:
```typescript
base: '/',
```

### Passo 3: Ativar GitHub Pages

1. Vá até o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **GitHub Actions**
5. Pronto! O deploy será automático a cada push

### Passo 4: Acessar o Site

Após alguns minutos, seu site estará disponível em:
```
https://SEU-USUARIO.github.io/serralheria-ella/
```

## 🔧 Painel de Administração

### Como Acessar

1. Clique no **botão vermelho redondo** no canto inferior direito do site
2. O painel se abrirá com duas abas:
   - **Portfólio**: Gerenciar projetos
   - **Sobre Nós**: Editar conteúdo da seção

### Funcionalidades

**Portfólio:**
- ➕ Adicionar novos projetos
- ✏️ Editar projetos existentes
- 🗑️ Excluir projetos
- 📂 Organizar por categorias

**Sobre Nós:**
- Editar título e subtítulo
- Atualizar descrições
- Personalizar conteúdo institucional

📖 **Documentação completa**: Veja o arquivo [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## 🗄️ Banco de Dados (Supabase)

O site usa Supabase para armazenar:
- Projetos do portfólio
- Conteúdo da seção "Sobre Nós"
- Configurações gerais

### Estrutura de Dados

```
portfolio:{id} → { id, title, category, image }
about:content → { title, subtitle, description1, description2 }
```

## 🔒 Segurança

⚠️ **Importante**: O painel admin atualmente é público. Para adicionar autenticação:

1. Entre em contato com um desenvolvedor
2. Ou implemente Supabase Auth seguindo a [documentação oficial](https://supabase.com/docs/guides/auth)

## 📦 Tecnologias Utilizadas

- **React** 18.3
- **TypeScript**
- **Vite** 6.3
- **Tailwind CSS** 4.1
- **Motion** (Framer Motion) 12.23
- **Lucide React** (ícones)
- **Supabase** (backend)
- **React Hook Form** (formulários)

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento local
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview
```

## 🎨 Paleta de Cores

- **Carmim Escuro**: `#991B1B` (red-700)
- **Carmim Médio**: `#B91C1C` (red-600)
- **Fundo Escuro**: `#0A0A0A` (neutral-950)
- **Fundo Secundário**: `#171717` (neutral-900)

## 📞 Contato

Para dúvidas sobre o sistema ou customizações, entre em contato através do formulário no site ou consulte o desenvolvedor responsável.

## 📄 Licença

Este projeto é propriedade da Serralheria ELLA. Todos os direitos reservados.

---

Desenvolvido com ❤️ para a Serralheria ELLA
