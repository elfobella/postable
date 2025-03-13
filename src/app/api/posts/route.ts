import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { authMiddleware } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { desc, eq } from 'drizzle-orm';

// Tüm postları getir
export async function GET() {
  try {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Postları getirme hatası:', error);
    return NextResponse.json(
      { error: 'Postlar getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Yeni post oluştur
export async function POST(request: NextRequest) {
  try {
    // Kimlik doğrulama
    const auth = authMiddleware(request);
    if (auth instanceof NextResponse) {
      return auth;
    }

    const { userId } = auth;
    
    // Form verilerini al
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    // Gerekli alanları kontrol et
    if (!title || !description || !imageFile) {
      return NextResponse.json(
        { error: 'Başlık, açıklama ve resim gereklidir' },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const user = await db.select().from(users).where(eq(users.id, userId));
    
    if (user.length === 0) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Resmi base64'e dönüştür
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

    // Postu veritabanına ekle
    const postId = uuidv4();
    await db.insert(posts).values({
      id: postId,
      title,
      description,
      imageUrl: base64Image,
      userId,
      username: user[0].username,
      createdAt: new Date()
    });

    return NextResponse.json(
      { message: 'Post başarıyla oluşturuldu', postId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Post oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'Post oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 