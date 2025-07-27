import { NextResponse } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';
import { protectDevRoute } from '@/lib/dev-protection';
import { handleApiError } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

// Development-only endpoint for syncing IdeaBrowser data without authentication
export async function POST() {
  try {
    // Only allow in development environment
    protectDevRoute();

    logger.info('Starting development IdeaBrowser sync');
    const results = await IdeaBrowserSync.syncIdeas();

    logger.info('Development sync completed', results);

    return NextResponse.json({
      success: true,
      message: 'Development sync completed',
      results
    });
  } catch (error) {
    return handleApiError(error, 'development-sync');
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Development IdeaBrowser sync endpoint. Use POST to trigger sync.' 
  });
} 