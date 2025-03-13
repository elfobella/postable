import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hashPassword } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

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

    // Kullanıcının zaten var olup olmadığını kontrol et
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await hashPassword(password);

    // Kullanıcıyı veritabanına ekle
    const userId = uuidv4();
    await db.insert(users).values({
      id: userId,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu', userId },
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