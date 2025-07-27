import { AppError } from './error-handler';

export function protectDevRoute() {
  if (process.env.NODE_ENV === 'production') {
    throw new AppError('Development endpoints are not available in production', 404);
  }
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
} 