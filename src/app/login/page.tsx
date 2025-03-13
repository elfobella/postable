'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// SearchParams için bir bileşen oluşturuyoruz
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (registered) {
      setSuccess('Kayıt işlemi başarılı! Şimdi giriş yapabilirsiniz.');
    }
  }, [registered]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      setLoading(true);
      
      // Demo giriş bilgilerini kullan
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        // Demo kullanıcı bilgilerini localStorage'a kaydet
        localStorage.setItem('token', 'demo-token-123456');
        localStorage.setItem('user', JSON.stringify({
          id: 'demo-user-id',
          username: 'Demo Kullanıcı',
          email: formData.email
        }));
        
        // Ana sayfaya yönlendir
        router.push('/dashboard');
        return;
      }
      
      // Herhangi bir kullanıcı girişine izin ver
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Yanıt kontrolü
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Giriş işlemi başarısız oldu';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('API yanıtı JSON formatında değil:', errorText);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Ana sayfaya yönlendir
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Giriş hatası:', err);
      setError(err.message || 'Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
        
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Kayıt Ol
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            Not: Herhangi bir email ve şifre ile giriş yapabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

// Ana bileşen Suspense ile sarılmış LoginContent'i döndürür
export default function Login() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Yükleniyor...</div>}>
      <LoginContent />
    </Suspense>
  );
}