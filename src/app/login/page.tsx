import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Giriş Yap | Postable',
  description: 'Postable hesabınıza giriş yapın ve paylaşımlara başlayın.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Postable</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Hesabınıza giriş yapın
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Veya{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              yeni bir hesap oluşturun
            </Link>
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Veya şununla devam edin
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div>
              <Link
                href="/"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Ana sayfaya dön</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}