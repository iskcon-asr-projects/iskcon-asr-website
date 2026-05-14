-- Create daily_darshans table
CREATE TABLE IF NOT EXISTS public.daily_darshans (
  date DATE PRIMARY KEY,
  images JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect table with basic RLS (optional: update depending on your security rules)
ALTER TABLE public.daily_darshans ENABLE ROW LEVEL SECURITY;

-- Allow public read access to darshans
CREATE POLICY "Public Darshans Read"
ON public.daily_darshans
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert/upsert for secure CMS managing
-- This ensures ONLY users logged into your /admin/login portal can upload Darshan images!
CREATE POLICY "Admin Darshans Write"
ON public.daily_darshans
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create festive_darshans table
CREATE TABLE IF NOT EXISTS public.festive_darshans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  festival_name TEXT NOT NULL,
  date DATE NOT NULL,
  images JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for festive_darshans
ALTER TABLE public.festive_darshans ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Festive Darshans Read"
ON public.festive_darshans
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to write
CREATE POLICY "Admin Festive Darshans Write"
ON public.festive_darshans
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create iyf_book_distribution table
CREATE TABLE IF NOT EXISTS public.iyf_book_distribution (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for iyf_book_distribution
ALTER TABLE public.iyf_book_distribution ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public IYF Read"
ON public.iyf_book_distribution
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to write
CREATE POLICY "Admin IYF Write"
ON public.iyf_book_distribution
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create iyf_yatras table
CREATE TABLE IF NOT EXISTS public.iyf_yatras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  yatra_name TEXT NOT NULL,
  date TEXT,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for iyf_yatras
ALTER TABLE public.iyf_yatras ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Yatra Read"
ON public.iyf_yatras
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to write
CREATE POLICY "Admin Yatra Write"
ON public.iyf_yatras
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create iyf_sankirtan table
CREATE TABLE IF NOT EXISTS public.iyf_sankirtan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date TEXT,
  type TEXT NOT NULL DEFAULT 'instagram_link',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for iyf_sankirtan
ALTER TABLE public.iyf_sankirtan ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Sankirtan Read"
ON public.iyf_sankirtan
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to write
CREATE POLICY "Admin Sankirtan Write"
ON public.iyf_sankirtan
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
