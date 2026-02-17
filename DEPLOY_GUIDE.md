# 🚀 Guia Completo de Deploy no GitHub Pages

## ✅ Checklist Antes de Começar

- [ ] Ter uma conta no GitHub (gratuita)
- [ ] Ter Git instalado no seu computador
- [ ] Código do site pronto (✓ já está!)

---

## 📝 Passo a Passo Detalhado

### **Passo 1: Criar Repositório no GitHub**

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name**: `serralheria-ella` (ou outro nome)
   - **Description**: "Site profissional da Serralheria ELLA"
   - Deixe como **Public** (público)
   - **NÃO marque** "Add a README file"
5. Clique em **"Create repository"**

---

### **Passo 2: Ajustar Configuração do Vite**

No arquivo `vite.config.ts`, linha 9, substitua:

```typescript
base: process.env.GITHUB_PAGES ? '/serralheria-ella/' : '/',
```

Por (usando o nome do SEU repositório):

```typescript
base: process.env.GITHUB_PAGES ? '/NOME-DO-SEU-REPOSITORIO/' : '/',
```

**Exemplo:** Se criou o repo como `site-ella`, use:
```typescript
base: process.env.GITHUB_PAGES ? '/site-ella/' : '/',
```

⚠️ **IMPORTANTE**: O nome deve ser EXATAMENTE igual ao nome do repositório!

---

### **Passo 3: Fazer Upload do Código**

Abra o terminal na pasta do projeto e execute:

```bash
# Inicializar repositório Git (se ainda não foi inicializado)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Primeiro commit - Site Serralheria ELLA"

# Renomear branch para main
git branch -M main

# Conectar ao repositório remoto (SUBSTITUA com sua URL)
git remote add origin https://github.com/SEU-USUARIO/serralheria-ella.git

# Enviar código para o GitHub
git push -u origin main
```

🔐 **Atenção**: O GitHub pode pedir seu usuário e senha. Se usar autenticação de dois fatores, você precisará criar um **Personal Access Token** em vez da senha.

---

### **Passo 4: Configurar GitHub Pages**

1. Vá até seu repositório no GitHub
2. Clique na aba **"Settings"** (Configurações)
3. No menu lateral esquerdo, clique em **"Pages"**
4. Em **"Source"** (Origem):
   - Selecione **"GitHub Actions"**
5. Pronto! ✅

---

### **Passo 5: Aguardar o Deploy**

1. Vá até a aba **"Actions"** no seu repositório
2. Você verá um workflow sendo executado (círculo amarelo girando)
3. Aguarde alguns minutos até aparecer um ✅ verde
4. O site estará disponível em:

```
https://SEU-USUARIO.github.io/serralheria-ella/
```

---

## 🔄 Atualizando o Site

Sempre que fizer mudanças no código:

```bash
# Adicionar alterações
git add .

# Criar commit
git commit -m "Descrição das mudanças"

# Enviar para o GitHub
git push
```

O site será automaticamente atualizado em alguns minutos! 🎉

---

## 🛠️ Personalizando a URL Base (Avançado)

### Opção 1: Usar Domínio Personalizado

1. Compre um domínio (ex: `serralheria-ella.com.br`)
2. No GitHub, vá em Settings → Pages → Custom domain
3. Digite seu domínio
4. Configure os DNS conforme instruções do GitHub

### Opção 2: Usar Repositório de Usuário

Se criar um repositório chamado **`SEU-USUARIO.github.io`**:

1. No `vite.config.ts`, use:
```typescript
base: '/',
```

2. O site ficará em: `https://SEU-USUARIO.github.io/`

---

## ❓ Solução de Problemas

### Problema: Build falhou no GitHub Actions

**Solução:**
1. Vá em Actions → Clique no workflow que falhou
2. Leia os logs de erro
3. Geralmente é problema de dependências ou configuração

### Problema: Site mostra página em branco

**Possíveis causas:**
1. ❌ Base URL incorreta no `vite.config.ts`
   - Verifique se o nome do repo está correto
2. ❌ Build não completou
   - Verifique a aba Actions

### Problema: CSS não está carregando

**Solução:**
- Verifique a base URL no `vite.config.ts`
- Deve terminar com `/` (ex: `/serralheria-ella/`)

### Problema: API do Supabase não funciona

**Solução:**
- O Supabase já está configurado
- Verifique se as variáveis em `/utils/supabase/info.tsx` estão corretas

---

## 🎯 Verificação Final

Após o deploy, teste:

- [ ] Site abre corretamente
- [ ] Todas as seções aparecem
- [ ] Imagens carregam
- [ ] Formulário de contato funciona
- [ ] Painel admin abre (botão vermelho)
- [ ] Menu de navegação funciona
- [ ] Site é responsivo no celular

---

## 📊 Monitoramento

### Ver Estatísticas de Acesso

O GitHub não fornece analytics nativamente. Recomendações:

1. **Google Analytics** (gratuito)
   - Adicione o código de tracking no `index.html`

2. **Vercel Analytics** (gratuito)
   - Alternativa ao GitHub Pages com analytics incluído

---

## 🆘 Precisa de Ajuda?

1. **Documentação GitHub Pages**: https://docs.github.com/pages
2. **Documentação Vite**: https://vitejs.dev/guide/static-deploy.html
3. **Suporte GitHub Community**: https://github.community/

---

## 📌 Links Importantes

- 🔗 Seu repositório: `https://github.com/SEU-USUARIO/serralheria-ella`
- 🌐 Seu site: `https://SEU-USUARIO.github.io/serralheria-ella/`
- 📊 Actions: `https://github.com/SEU-USUARIO/serralheria-ella/actions`
- ⚙️ Settings: `https://github.com/SEU-USUARIO/serralheria-ella/settings`

---

✅ **Pronto!** Seu site está configurado e pronto para o GitHub Pages!

Se tiver dúvidas, consulte os arquivos `README.md` e `ADMIN_GUIDE.md` no projeto.
