import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Bu middleware, her istekte Supabase oturum bilgilerini kontrol eder
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Supabase istemcisini oluştur
  const supabase = createMiddlewareClient({ req, res });
  
  // Oturumu yenile
  await supabase.auth.getSession();
  
  return res;
}

// Middleware'in çalışacağı yolları belirt
export const config = {
  matcher: [
    // Kimlik doğrulama gerektiren sayfalar
    '/dashboard/:path*',
    '/create-post/:path*',
    '/profile/:path*',
    // API rotaları
    '/api/posts/:path*',
    '/api/profile/:path*',
  ],
};