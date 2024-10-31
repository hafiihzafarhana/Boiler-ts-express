import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();

// Config .env
class ConfigData {
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public CLOUDINARY_NAME: string | undefined;
  public CLOUDINARY_API_KEY: string | undefined;
  public CLOUDINARY_API_SECRET: string | undefined;
  public DATABASE_HOST: string | undefined;
  public DATABASE_USER: string | undefined;
  public DATABASE_PASSWORD: string | undefined;
  public DATABASE_NAME: string | undefined;
  public CLUSTER_TYPE: string | undefined;

  public ACCESS_TOKEN_SECRET: string | undefined;
  public REFRESH_TOKEN_SECRET: string | undefined;
  public ACCESS_TOKEN_TIME: string | undefined;
  public REFRESH_TOKEN_TIME: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || '';
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
    this.DATABASE_HOST = process.env.DATABASE_HOST || '';
    this.DATABASE_USER = process.env.DATABASE_USER || '';
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
    this.DATABASE_NAME = process.env.DATABASE_NAME || '';
    this.CLUSTER_TYPE = process.env.CLUSTER_TYPE || '';

    this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
    this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
    this.ACCESS_TOKEN_TIME = process.env.ACCESS_TOKEN_TIME || '';
    this.REFRESH_TOKEN_TIME = process.env.REFRESH_TOKEN_TIME || '';
  }
}

export const todoConfig: ConfigData = new ConfigData();

export function cloudinaryConfig(): void {
  cloudinary.v2.config({
    cloud_name: todoConfig?.CLOUDINARY_NAME as string,
    api_key: todoConfig?.CLOUDINARY_API_KEY as string,
    api_secret: todoConfig?.CLOUDINARY_API_SECRET as string
  });
  checkCloudinary();
}

export async function checkCloudinary(): Promise<void> {
  try {
    const result = await cloudinary.v2.api.ping();
    if (result.status === 'ok') {
      console.log('Cloudinary connection successful');
    } else {
      console.log('Cloudinary connection failed');
    }
  } catch (error) {
    console.error('Cloudinary connection failed:', error);
  }
}
