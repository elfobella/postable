'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  email: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  username: string;
  createdAt: string;
}

// Demo amaçlı örnek postlar
const demoPostlar = [
  {
    id: 'post-1',
    title: 'Doğa Manzarası',
    description: 'Harika bir doğa manzarası fotoğrafı',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    userId: 'user-1',
    username: 'DoğaSever',
    createdAt: new Date(2023, 5, 15).toISOString()
  },
  {
    id: 'post-2',
    title: 'Şehir Manzarası',
    description: 'Modern bir şehir manzarası',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1944&q=80',
    userId: 'user-2',
    username: 'ŞehirKeşfedeni',
    createdAt: new Date(2023, 6, 20).toISOString()
  },
  {
    id: 'post-3',
    title: 'Deniz Manzarası',
    description: 'Muhteşem bir deniz manzarası',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    userId: 'user-3',
    username: 'DenizAşığı',
    createdAt: new Date(2023, 7, 10).toISOString()
  }
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      return;
    }

    // Postları getir
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // localStorage'dan kullanıcı postlarını al
      const storedPosts = localStorage.getItem('posts');
      let userPosts: Post[] = [];
      
      if (storedPosts) {
        userPosts = JSON.parse(storedPosts);
      }
      
      // Kullanıcı postları varsa, demo postlarla birleştir
      // Yoksa sadece demo postları göster
      if (userPosts && userPosts.length > 0) {
        setPosts([...userPosts, ...demoPostlar]);
      } else {
        setPosts(demoPostlar);
      }
      
      setLoading(false);
      return;
      
      // API'den postları getir (şu an kullanılmıyor)
      const response = await fetch('/api/posts');
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Postlar getirilirken bir hata oluştu';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('API yanıtı JSON formatında değil:', errorText);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setPosts(data);
    } catch (err: any) {
      console.error('Postları getirme hatası:', err);
      setError(err.message || 'Postlar getirilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

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
                href="/create-post" 
                className="mr-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Yeni Post
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold mb-6">Tüm Postlar</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Henüz hiç post bulunmuyor.</p>
              <Link 
                href="/create-post" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                İlk Postu Oluştur
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <div key={post.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{post.username}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}