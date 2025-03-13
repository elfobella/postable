import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Supabase kimlik doğrulama geri çağrı işleyicisi
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Oturum açma işlemini tamamla
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Kullanıcıyı ana sayfaya yönlendir
  return NextResponse.redirect(new URL('/dashboard', req.url));
}