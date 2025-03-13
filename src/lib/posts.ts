import { supabase } from './supabase';

// Tüm postları getir
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Belirli bir kullanıcının postlarını getir
export async function getUserPosts(userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Belirli bir postu getir
export async function getPostById(postId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq('id', postId)
    .single();
  
  if (error) throw error;
  return data;
}

// Yeni post oluştur
export async function createPost(userId: string, post: { title: string, description: string, image_url: string }) {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: userId,
      title: post.title,
      description: post.description,
      image_url: post.image_url
    })
    .select();
  
  if (error) throw error;
  return data;
}

// Post güncelle
export async function updatePost(postId: string, updates: { title?: string, description?: string, image_url?: string }) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', postId)
    .select();
  
  if (error) throw error;
  return data;
}

// Post sil
export async function deletePost(postId: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);
  
  if (error) throw error;
  return true;
}

// Postları ara
export async function searchPosts(query: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}