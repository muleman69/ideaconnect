import { NextResponse } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';

export async function GET() {
  try {
    const featuredIdea = await IdeaBrowserSync.getFeaturedIdea();
    
    if (!featuredIdea) {
      return NextResponse.json(
        { error: 'No featured idea found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ idea: featuredIdea });
  } catch (error) {
    console.error('Error fetching featured idea:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured idea' },
      { status: 500 }
    );
  }
}