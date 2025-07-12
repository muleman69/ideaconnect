import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const skip = (page - 1) * limit;

    const where: { category?: string; isFeatured?: boolean } = {};
    if (category) where.category = category;
    if (featured) where.isFeatured = true;

    const ideas = await prisma.idea.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true
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
        _count: {
          select: {
            interests: true,
            discussions: true,
            teams: true
          }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: limit
    });

    const total = await prisma.idea.count({ where });

    return NextResponse.json({
      ideas,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, category, skills, location, stage, equity } = body;

    // Validate required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        category,
        skills: skills || [],
        location,
        stage,
        equity,
        authorId: dbUser.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true
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

    return NextResponse.json({ idea }, { status: 201 });
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}