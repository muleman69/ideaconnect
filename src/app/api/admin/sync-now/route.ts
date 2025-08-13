import { NextRequest } from 'next/server';
import { IdeaBrowserSync } from '@/lib/ideabrowser-sync';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  const started = Date.now();
  try {
    const result = await IdeaBrowserSync.syncIdeas();
    const ms = Date.now() - started;
    return Response.json({ ok: true, ms, ...result });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}


