import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  default: process.env.DB_CONNECTION || 'mysql',
  connections: {
    sqlite: {
      url: process.env.DATABASE_URL || '',
      database: process.env.DB_DATABASE || 'database.sqlite',
    },
    mysql: {
      url: process.env.DATABASE_URL || '',
      port: process.env.DB_PORT || '127.0.0.1',
      host: process.env.DB_HOST || '3306',
      database: process.env.DB_DATABASE || 'nestjs',
      username: process.env.DB_USERNAME || 'nestjs',
      password: process.env.DB_PASSWORD || '',
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      strict: 'true',
      prefix: '',
      prefix_indexes: true,
    },
    pgsql: {
      url: process.env.DATABASE_URL || '',
      port: process.env.DB_PORT || '127.0.0.1',
      host: process.env.DB_HOST || '5432',
      database: process.env.DB_DATABASE || 'nestjs',
      username: process.env.DB_USERNAME || 'nestjs',
      password: process.env.DB_PASSWORD || '',
      charset: 'utf8',
      prefix: '',
      prefix_indexes: true,
      schema: 'public',
      sslmode: 'prefer',
    },
    redis: {
      default: {
        url: process.env.REDIS_URL,
        host: process.env.REDIS_HOST || '127.0.0.1',
        password: process.env.REDIS_PASSWORD || '',
        port: process.env.REDIS_PORT || '6379',
        database: process.env.REDIS_DB || '0',
      },
      cache: {
        url: process.env.REDIS_URL,
        host: process.env.REDIS_HOST || '127.0.0.1',
        password: process.env.REDIS_PASSWORD || '',
        port: process.env.REDIS_PORT || '6379',
        database: process.env.REDIS_CACHE_DB || '1',
      },
    },
  },
}));
