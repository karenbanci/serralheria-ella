-- Migration: Add created_by and created_by_name to portfolio
BEGIN;

ALTER TABLE public.portfolio
ADD COLUMN IF NOT EXISTS created_by uuid,
ADD COLUMN IF NOT EXISTS created_by_name text;

-- Enable Row Level Security (recommended)
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Allow public SELECTs (optional; remove if you want strict privacy)
-- Allow public SELECTs (optional; remove if you want strict privacy)
CREATE POLICY allow_select_public ON public.portfolio
    FOR SELECT
    USING (true);

-- Allow authenticated users to insert rows only when created_by = auth.uid()
CREATE POLICY allow_auth_inserts ON public.portfolio
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

COMMIT;

-- NOTES:
-- 1) This migration adds the new columns and enables RLS.
-- 2) The server-side function uses the Service Role Key to insert rows,
--    so it bypasses RLS; the INSERT policy is useful if you ever allow
--    client-side inserts by authenticated users.
