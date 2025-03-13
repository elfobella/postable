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

    // Demo amaçlı basit doğrulama - herhangi bir email/şifre kombinasyonunu kabul et
    // Gerçek uygulamada veritabanından kullanıcı kontrolü yapılmalıdır
    const token = 'demo-token-123456';
    
    // Kullanıcı adını email'den türet
    const username = email.split('@')[0];

    return NextResponse.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: 'demo-user-id',
        username: username || 'Demo Kullanıcı',
        email: email
      }
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
}