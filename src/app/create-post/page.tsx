'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  email: string;
}

export default function CreatePost() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan al
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Form doğrulama
    if (!title || !description || !imageUrl) {
      setError('Lütfen tüm alanları doldurun');
      setLoading(false);
      return;
    }

    try {
      // Demo post oluşturma - gerçek API çağrısı yerine
      // Başarılı mesajı göster ve 2 saniye sonra dashboard'a yönlendir
      setSuccess('Post başarıyla oluşturuldu! Dashboard sayfasına yönlendiriliyorsunuz...');
      
      // Yeni postu localStorage'a kaydet
      const existingPostsJSON = localStorage.getItem('posts');
      const existingPosts = existingPostsJSON ? JSON.parse(existingPostsJSON) : [];
      
      const newPost = {
        id: `post-${Date.now()}`,
        title,
        description,
        imageUrl,
        userId: user?.id || 'unknown',
        username: user?.username || 'Anonim Kullanıcı',
        createdAt: new Date().toISOString()
      };
      
      // Yeni postu listeye ekle ve localStorage'a kaydet
      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      
      return;
      
      // Gerçek API çağrısı (şu an kullanılmıyor)
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Post oluşturulurken bir hata oluştu';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('API yanıtı JSON formatında değil:', errorText);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setSuccess('Post başarıyla oluşturuldu! Dashboard sayfasına yönlendiriliyorsunuz...');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Post oluşturma hatası:', err);
      setError(err.message || 'Post oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold">
                Post Paylaşım
              </Link>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">Merhaba, {user?.username}</span>
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Yeni Post Oluştur</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Başlık
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Post başlığı"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Açıklama
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Post açıklaması"
                  rows={4}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                  Görsel URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="text-gray-500 text-xs mt-1">
                  Örnek görsel URL'leri:
                </p>
                <ul className="text-gray-500 text-xs mt-1 list-disc pl-5">
                  <li>https://images.unsplash.com/photo-1501854140801-50d01698950b</li>
                  <li>https://images.unsplash.com/photo-1477959858617-67f85cf4f1df</li>
                  <li>https://images.unsplash.com/photo-1507525428034-b723cf961d3e</li>
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Oluşturuluyor...' : 'Post Oluştur'}
                </button>
                <Link
                  href="/dashboard"
                  className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                >
                  İptal
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}