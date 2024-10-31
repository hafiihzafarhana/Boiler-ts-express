import jwt, { Secret, JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { todoConfig } from '@root/config';
import { ITokenPayload } from '@infrastructure/token';

export const ACCESS_TOKEN_SECRET: Secret = todoConfig.ACCESS_TOKEN_SECRET as Secret;
export const REFRESH_TOKEN_SECRET: Secret = todoConfig.REFRESH_TOKEN_SECRET as Secret;
const ACCESS_TOKEN_TIME = '30d' as string;
const REFRESH_TOKEN_TIME = '30d' as string;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const generateRefreshToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TIME
  });
};

export const generateAccessToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TIME
  });
};

export const verifyRefreshToken = (refreshToken: string): ITokenPayload | null => {
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as ITokenPayload;
    return payload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // Token kedaluwarsa
      return null;
    }
    // Kesalahan lainnya
    throw new Error('Invalid token');
  }
};

export const verifyAccessToken = (accessToken: string): ITokenPayload | null => {
  try {
    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as ITokenPayload;
    return payload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // Token kedaluwarsa
      return null;
    }
    // Kesalahan lainnya
    throw new Error('Invalid token');
  }
};

export const generateTokens = (userId: string, email: string): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken({ user_id: userId, email });
  const refreshToken = generateRefreshToken({ user_id: userId, email });
  return { accessToken, refreshToken };
};
