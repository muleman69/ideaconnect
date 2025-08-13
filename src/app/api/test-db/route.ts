import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const count = await prisma.idea.count();
  const sample = await prisma.idea.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  return Response.json({ count, sample });
}


