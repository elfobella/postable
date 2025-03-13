import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Minimal Post Paylaşım Sitesi
        </h1>
        
        <p className="text-xl text-center mb-12">
          Resim, başlık ve açıklama içeren postlar oluşturun ve paylaşın.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link 
            href="/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center text-lg transition-colors"
          >
            Kayıt Ol
          </Link>
          
          <Link 
            href="/login" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg text-center text-lg transition-colors"
          >
            Giriş Yap
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Resim Paylaşımı</h3>
            <p className="text-gray-600">Fotoğraflarınızı kolayca yükleyin ve paylaşın.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">İçerik Oluşturma</h3>
            <p className="text-gray-600">Başlık ve açıklamalarla içeriklerinizi zenginleştirin.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Topluluk</h3>
            <p className="text-gray-600">Diğer kullanıcıların paylaşımlarını görün ve etkileşimde bulunun.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
