import Database from 'better-sqlite3';

// SQLite veritabanı bağlantısını oluştur
const sqlite = new Database('./sqlite.db');

// Veritabanı şemasını oluştur
async function main() {
  console.log('Veritabanı tabloları oluşturuluyor...');
  
  // Kullanıcılar tablosunu oluştur
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);
  
  // Postlar tablosunu oluştur
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      user_id TEXT NOT NULL,
      username TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  
  console.log('Veritabanı tabloları başarıyla oluşturuldu!');
}

main().catch((error) => {
  console.error('Veritabanı migration hatası:', error);
  process.exit(1);
}); 