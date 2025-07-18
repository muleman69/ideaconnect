import { NextResponse } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';
import { handleApiError } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    logger.info('Starting IdeaBrowser sync');
    
    const results = await IdeaBrowserSync.syncIdeas();
    
    logger.info('IdeaBrowser sync completed successfully', {
      synced: results.synced,
      skipped: results.skipped,
      cleaned: results.cleaned,
      errors: results.errors.length,
    });
    
    return NextResponse.json({
      success: true,
      message: `Sync completed successfully`,
      results: {
        synced: results.synced,
        skipped: results.skipped,
        cleaned: results.cleaned,
        errors: results.errors.length,
        errorDetails: results.errors
      }
    });
  } catch (error) {
    return handleApiError(error, 'ideabrowser-sync');
  }
}

export async function POST() {
  // Same logic for manual triggers
  return GET();
}