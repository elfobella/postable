import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Kullanıcı tablosu
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Post tablosu
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
  username: text('username').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
}); 