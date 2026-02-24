BEGIN;

-- Permite que usuários autenticados removam registros da tabela portfolio.
-- Necessário para o botão "Remover Projeto" funcionar no painel admin.
DROP POLICY IF EXISTS allow_auth_deletes ON public.portfolio;

CREATE POLICY allow_auth_deletes ON public.portfolio FOR DELETE TO authenticated USING (true);

COMMIT;
