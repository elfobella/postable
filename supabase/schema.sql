-- Kullanıcılar tablosu (Supabase Auth ile otomatik oluşturulur)
-- Bu tablo Supabase Auth tarafından yönetilir, burada sadece referans için gösterilmiştir
-- CREATE TABLE auth.users (
--   id uuid NOT NULL PRIMARY KEY,
--   email text,
--   ...
-- );

-- Profiller tablosu
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Profiller için RLS (Row Level Security) politikaları
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Herkes profilleri okuyabilir
CREATE POLICY "Profiller herkese açık" ON public.profiles
  FOR SELECT USING (true);

-- Kullanıcılar sadece kendi profillerini düzenleyebilir
CREATE POLICY "Kullanıcılar kendi profillerini düzenleyebilir" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Postlar tablosu
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Postlar için RLS politikaları
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Herkes postları okuyabilir
CREATE POLICY "Postlar herkese açık" ON public.posts
  FOR SELECT USING (true);

-- Kullanıcılar kendi postlarını oluşturabilir
CREATE POLICY "Kullanıcılar post oluşturabilir" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi postlarını düzenleyebilir
CREATE POLICY "Kullanıcılar kendi postlarını düzenleyebilir" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Kullanıcılar kendi postlarını silebilir
CREATE POLICY "Kullanıcılar kendi postlarını silebilir" ON public.posts
  FOR DELETE USING (auth.uid() = user_id);

-- Fonksiyonlar ve Tetikleyiciler

-- Profil oluşturma fonksiyonu
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Yeni kullanıcı oluşturulduğunda profil oluşturma tetikleyicisi
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Güncelleme zamanını otomatik güncelleyen fonksiyon
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profil güncellendiğinde updated_at alanını güncelleme tetikleyicisi
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Post güncellendiğinde updated_at alanını güncelleme tetikleyicisi
CREATE TRIGGER on_post_updated
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();