import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idea = await prisma.idea.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            bio: true,
            skills: true
          }
        },
        interests: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            }
          }
        },
        discussions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true
                  }
                }
              }
            }
          },
          where: {
            parentId: null // Only top-level discussions
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        teams: {
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            },
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            interests: true,
            discussions: true,
            teams: true
          }
        }
      }
    });

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ idea });
  } catch (error) {
    console.error('Error fetching idea:', error);
    return NextResponse.json(
      { error: 'Failed to fetch idea' },
      { status: 500 }
    );
  }
}