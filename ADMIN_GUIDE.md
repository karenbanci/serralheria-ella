# Guia de Administração - Serralheria ELLA

## 📋 Sobre o Painel de Administração

O site da Serralheria ELLA possui um painel de administração integrado que permite gerenciar:
- **Portfólio**: Adicionar, editar e excluir projetos
- **Sobre Nós**: Editar o conteúdo da seção "Sobre Nós"

## 🚀 Como Acessar o Painel Admin

1. No canto inferior direito do site, você verá um **botão vermelho redondo** com um ícone de lápis
2. Clique nesse botão para abrir o painel de administração

## 📸 Gerenciando o Portfólio

### Adicionar Novo Projeto

1. Abra o painel admin e selecione a aba **"Portfólio"**
2. Na seção "Adicionar Novo Projeto", preencha:
   - **Título do projeto**: Nome descritivo do projeto
   - **Categoria**: Selecione uma das categorias:
     - Portões
     - Box de Banheiro
     - Escadas e Guarda-Corpos
     - Fachadas
     - Esquadrias
   - **URL da imagem**: Cole a URL completa da imagem do projeto
3. Clique em **"Adicionar Projeto"**

### Editar Projeto Existente

1. Na lista de "Projetos Existentes", encontre o projeto que deseja editar
2. Clique no botão **azul com ícone de lápis**
3. Altere os campos desejados
4. Clique em **"Salvar"** ou **"Cancelar"** para descartar as alterações

### Excluir Projeto

1. Na lista de "Projetos Existentes", encontre o projeto que deseja excluir
2. Clique no botão **vermelho com ícone de lixeira**
3. Confirme a exclusão quando solicitado

## ✏️ Editando "Sobre Nós"

1. Abra o painel admin e selecione a aba **"Sobre Nós"**
2. Edite os campos:
   - **Título**: O título principal da seção (ex: "Sobre Nós")
   - **Subtítulo**: Breve descrição da empresa
   - **Primeiro Parágrafo**: Informações sobre a parceria e qualidade
   - **Segundo Parágrafo**: Detalhes sobre a equipe e processos
3. Clique em **"Salvar Alterações"**

## 🖼️ Onde Conseguir URLs de Imagens

Você pode obter URLs de imagens de várias fontes:

1. **Unsplash** (https://unsplash.com)
   - Imagens profissionais gratuitas
   - Clique com botão direito na imagem → "Copiar endereço da imagem"

2. **Upload em serviços de hospedagem**:
   - Imgur (https://imgur.com)
   - ImageBB (https://imgbb.com)
   - Cloudinary (https://cloudinary.com)

3. **Suas próprias fotos**:
   - Faça upload em um serviço de hospedagem
   - Copie a URL pública da imagem

## 💡 Dicas Importantes

- **URLs de imagens devem começar com `https://`**
- Use imagens em **alta qualidade** para melhor apresentação
- Recomenda-se imagens com **proporção 4:3** para melhor visualização
- As alterações são **salvas automaticamente no banco de dados**
- O conteúdo é carregado automaticamente quando visitantes acessam o site

## 🔄 Atualizações em Tempo Real

- As alterações feitas no painel admin são **salvas no Supabase**
- Ao recarregar a página, o conteúdo atualizado será exibido
- Os visitantes verão as alterações na próxima vez que acessarem o site

## 📝 Estrutura do Banco de Dados

O sistema utiliza o Supabase para armazenar:

### Portfólio
- **Chave**: `portfolio:{id}`
- **Dados**: id, title, category, image

### Sobre Nós
- **Chave**: `about:content`
- **Dados**: title, subtitle, description1, description2

## 🌐 Deploy no GitHub Pages

Para fazer o deploy do site no GitHub Pages:

1. Crie um repositório no GitHub
2. Faça push do código para o repositório
3. Vá em Settings → Pages
4. Selecione a branch principal e a pasta raiz
5. O GitHub gerará uma URL pública para o site

## 🔒 Segurança

- O painel admin está **visível para todos** que acessam o site
- Para adicionar autenticação, entre em contato com o desenvolvedor
- Não compartilhe as credenciais de acesso ao Supabase

## 📞 Suporte

Se precisar de ajuda ou tiver dúvidas sobre o painel de administração, entre em contato com o desenvolvedor que configurou o sistema.
