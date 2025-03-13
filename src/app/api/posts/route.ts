import { NextRequest, NextResponse } from 'next/server';

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

// Tüm postları getir
export async function GET() {
  try {
    return NextResponse.json(demoPostlar);
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

    // Demo amaçlı yeni post oluştur
    const newPost = {
      id: `post-${Date.now()}`,
      title,
      description,
      imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      userId: 'demo-user-id',
      username: 'Demo Kullanıcı',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(
      { message: 'Post başarıyla oluşturuldu', postId: newPost.id },
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