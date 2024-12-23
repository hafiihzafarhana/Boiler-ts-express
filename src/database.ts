import { Logger } from 'winston';
import { Sequelize } from 'sequelize';
import pg from 'pg';

import { winstonLogger } from '@util/logger_util';
import { todoConfig } from '@root/config';

const logger: Logger = winstonLogger('DATABASE_db.ts', 'debug');

export const sqlz: Sequelize = new Sequelize(
  `${todoConfig?.DATABASE_NAME as string}`,
  `${todoConfig?.DATABASE_USER as string}`,
  `${todoConfig?.DATABASE_PASSWORD as string}`,
  {
    host: `${todoConfig?.DATABASE_HOST as string}`,
    port: 5432,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions:
      // Opsi SSL
      todoConfig.NODE_ENV !== 'development' && todoConfig.CLUSTER_TYPE === 'vercel'
        ? {
            ssl: {
              require: true, // Forces SSL connection
              rejectUnauthorized: false // Ignores unauthorized SSL certificates
            }
          }
        : {},
    logging: false,
    pool: {
      max: 1000, // Maksimal 5 koneksi
      min: 0, // Tidak ada koneksi minimum
      acquire: 30000, // 30 detik waktu maksimum untuk mendapatkan koneksi
      idle: 10000 // 10 detik waktu idle sebelum koneksi ditutup
    },
    define: {
      timestamps: true, // Menambahkan createdAt dan updatedAt ke tabel
      underscored: false, // Mengubah camelCase ke snake_case untuk nama kolom
      paranoid: true, // Menggunakan soft delete (menambahkan kolom deletedAt)
      freezeTableName: false // Tidak mengubah nama tabel menjadi plural (misal: 'User' tetap 'User', bukan 'Users')
    }
  }
);

export async function dbCon(): Promise<void> {
  try {
    await sqlz.authenticate();
    logger.info('DATABASE_db.ts connected');
  } catch (error) {
    logger.error('DATABASE_db.ts - unable to connect db');
    logger.log('error', 'DATABASE_db.ts dbCon() error', error);
  }
}
