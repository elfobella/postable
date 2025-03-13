import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Gerekli alanları kontrol et
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Kullanıcı adı, email ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      );
    }

    // Demo amaçlı basit kayıt
    // Gerçek uygulamada veritabanına kullanıcı kaydedilmelidir
    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu', userId: 'demo-user-id' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}