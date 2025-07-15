import { logger } from './logger';
import { NextResponse } from 'next/server';

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  context?: Record<string, any>;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly context?: Record<string, any>;

  constructor(message: string, statusCode: number = 500, code?: string, context?: Record<string, any>) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.context = context;
    this.name = 'AppError';
  }
}

export function handleApiError(error: unknown, operation: string): NextResponse {
  if (error instanceof AppError) {
    logger.error(`API Error in ${operation}`, error, {
      statusCode: error.statusCode,
      code: error.code,
      context: error.context,
    });

    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode }
    );
  }

  // Unknown error
  logger.error(`Unexpected error in ${operation}`, error instanceof Error ? error : new Error(String(error)));

  return NextResponse.json(
    {
      error: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : String(error),
    },
    { status: 500 }
  );
}

// Validation helpers
export function validateRequiredFields(data: Record<string, any>, requiredFields: string[]) {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(', ')}`,
      400,
      'VALIDATION_ERROR',
      { missingFields }
    );
  }
}

// Database error helper
export function handleDatabaseError(error: unknown): never {
  if (error instanceof Error) {
    // Check for common database errors
    if (error.message.includes('unique constraint')) {
      throw new AppError('This record already exists', 409, 'DUPLICATE_RECORD');
    }
    if (error.message.includes('foreign key constraint')) {
      throw new AppError('Referenced record not found', 400, 'INVALID_REFERENCE');
    }
    if (error.message.includes('not found')) {
      throw new AppError('Record not found', 404, 'NOT_FOUND');
    }
  }
  
  throw new AppError('Database operation failed', 500, 'DATABASE_ERROR');
} 