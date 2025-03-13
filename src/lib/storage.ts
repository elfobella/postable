import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Dosya yükleme
export async function uploadFile(file: File, bucket: string = 'post-images') {
  // Benzersiz bir dosya adı oluştur
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  // Dosyayı yükle
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  // Dosya URL'sini al
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    path: data.path,
    url: publicUrl
  };
}

// Dosya silme
export async function deleteFile(filePath: string, bucket: string = 'post-images') {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) throw error;
  return true;
}

// Profil resmi yükleme
export async function uploadProfileImage(userId: string, file: File) {
  // Benzersiz bir dosya adı oluştur
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `${fileName}`;

  // Dosyayı yükle
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true // Varolan dosyanın üzerine yaz
    });

  if (error) throw error;

  // Dosya URL'sini al
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  // Kullanıcı profilini güncelle
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', userId);

  if (updateError) throw updateError;

  return {
    path: data.path,
    url: publicUrl
  };
}