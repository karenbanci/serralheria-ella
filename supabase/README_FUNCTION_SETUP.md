Quick steps to finish setup and deploy the server function

1) Add DB columns / policies
- Open Supabase Dashboard → SQL Editor and run the SQL in `supabase/migrations/001_add_created_by.sql`.

2) Configure the Function environment
- In Supabase Dashboard → Functions → server (your function), add these Environment Variables:
  - `SUPABASE_URL` = your project URL (e.g. https://mtflptbmmbibmcaxmrcu.supabase.co)
  - `SUPABASE_SERVICE_ROLE_KEY` = your Service Role Key (keep secret)
  - `BREVO_API_KEY` = API key da sua conta Brevo
  - `CONTACT_TO_EMAIL` = e-mail que receberá os contatos do site
  - `CONTACT_FROM_EMAIL` = remetente validado no Brevo (ex: no-reply@seudominio.com)
  - `WHATSAPP_ACCESS_TOKEN` = token da API do WhatsApp Cloud (Meta)
  - `WHATSAPP_PHONE_NUMBER_ID` = Phone Number ID do seu WhatsApp Business
  - `WHATSAPP_TO` = número que vai receber as notificações (formato internacional, ex: 5511989415518)
  - `WHATSAPP_TEMPLATE_NAME` = nome do template aprovado no WhatsApp Manager
  - `WHATSAPP_TEMPLATE_LANGUAGE` = idioma do template (ex: pt_BR)
  - `WHATSAPP_ALLOW_TEXT_FALLBACK` = `true` para tentar texto livre se template falhar (opcional; padrão `false`)

  Dashboard steps:
  - Open Supabase Dashboard → Functions → server → Settings → Environment variables
  - Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (paste the Service Role Key in full; wrap in quotes if prompted)
  - Save and re-deploy / restart the function from the UI

3) Deploy the function
- Easiest: use the Dashboard UI to deploy the function folder `supabase/functions/server`.
- Or install Supabase CLI (Homebrew on macOS):

```bash
brew install supabase/tap/supabase
supabase login
supabase functions deploy server --project-ref <project-ref> --no-verify-jwt
```

4) Test the flow
- Start your app, login a user, open the `Adicionar Projeto` form, select an image and submit.
- The client will upload the file to the `portfolio-images` bucket and then call the function at `/make-server-294ae748/portfolio/db` with the user's access token.

5) Debugging
- Check Function logs in Dashboard → Functions → server → Logs.
- If the function complains about missing env vars, set them in the Dashboard.

6) Contato por e-mail (Brevo) + WhatsApp
- A rota `POST /make-server-294ae748/contact` envia o formulário da seção Contato para o `CONTACT_TO_EMAIL` via Brevo.
- Se as variáveis `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TO` e `WHATSAPP_TEMPLATE_NAME` estiverem configuradas, a mesma rota envia automaticamente notificação via template oficial do WhatsApp.
- O envio para WhatsApp é feito no backend (sem clique do cliente no site).

Template esperado (ordem dos placeholders no corpo):
- `{{1}}` = nome
- `{{2}}` = telefone
- `{{3}}` = email
- `{{4}}` = mensagem

If you want, I can also:
- move the upload server-side (so the client doesn't need anon key), or
- create a migration file in a different format (for your deployment tool).
