import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Gerekli alanları kontrol et
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Demo amaçlı basit doğrulama
    // Gerçek uygulamada veritabanından kullanıcı kontrolü yapılmalıdır
    if (email === 'demo@example.com' && password === 'password') {
      // JWT token oluştur (demo amaçlı basit bir token)
      const token = 'demo-token-123456';

      return NextResponse.json({
        message: 'Giriş başarılı',
        token,
        user: {
          id: 'demo-user-id',
          username: 'Demo Kullanıcı',
          email: email
        }
      });
    }

    return NextResponse.json(
      { error: 'Geçersiz email veya şifre' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
}