import { supabase } from './supabase';

// Kullanıcı kaydı
export async function signUp(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) throw error;
  return data;
}

// Kullanıcı girişi
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Kullanıcı çıkışı
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Mevcut kullanıcıyı al
export async function getCurrentUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) throw error;
  if (!session) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Kullanıcı profilini al
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

// Kullanıcı profilini güncelle
export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (error) throw error;
  return data;
}