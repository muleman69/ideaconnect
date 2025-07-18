import { NextResponse } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const featuredIdea = await IdeaBrowserSync.getFeaturedIdea();
    
    if (!featuredIdea) {
      logger.info('No featured idea found in database - database may be empty');
      
      // Return a helpful response instead of an error when database is empty
      return NextResponse.json({
        idea: null,
        isEmpty: true,
        message: 'No ideas have been synced yet. The daily sync will populate content automatically.'
      });
    }

    return NextResponse.json({ 
      idea: featuredIdea,
      isEmpty: false 
    });
  } catch (error) {
    logger.error('Error fetching featured idea: ' + (error instanceof Error ? error.message : 'Unknown error'));
    return NextResponse.json(
      { 
        error: 'Failed to fetch featured idea',
        isEmpty: true,
        message: 'There was an error loading ideas. Please try again later.'
      },
      { status: 500 }
    );
  }
}