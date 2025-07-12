import { NextResponse } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // For now, allow any authenticated user to trigger sync
    // In production, you might want to restrict this to admin users
    const results = await IdeaBrowserSync.syncIdeas();

    return NextResponse.json({
      success: true,
      message: 'Sync completed',
      results
    });
  } catch (error) {
    console.error('Error during manual sync:', error);
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // This endpoint can be used for health checks or scheduled tasks
    const results = await IdeaBrowserSync.syncIdeas();

    return NextResponse.json({
      success: true,
      message: 'Scheduled sync completed',
      results
    });
  } catch (error) {
    console.error('Error during scheduled sync:', error);
    return NextResponse.json(
      { error: 'Scheduled sync failed' },
      { status: 500 }
    );
  }
}