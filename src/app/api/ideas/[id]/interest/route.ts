import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
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

    // Check if idea exists
    const idea = await prisma.idea.findUnique({
      where: { id }
    });

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    // Check if user already has interest
    const existingInterest = await prisma.interest.findUnique({
      where: {
        userId_ideaId: {
          userId: dbUser.id,
          ideaId: id
        }
      }
    });

    if (existingInterest) {
      // Remove interest (toggle off)
      await prisma.interest.delete({
        where: { id: existingInterest.id }
      });

      return NextResponse.json({ 
        interested: false,
        message: 'Interest removed' 
      });
    } else {
      // Add interest (toggle on)
      await prisma.interest.create({
        data: {
          userId: dbUser.id,
          ideaId: id
        }
      });

      return NextResponse.json({ 
        interested: true,
        message: 'Interest added' 
      });
    }
  } catch (error) {
    console.error('Error toggling interest:', error);
    return NextResponse.json(
      { error: 'Failed to toggle interest' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ interested: false });
    }

    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ interested: false });
    }

    const interest = await prisma.interest.findUnique({
      where: {
        userId_ideaId: {
          userId: dbUser.id,
          ideaId: id
        }
      }
    });

    return NextResponse.json({ interested: !!interest });
  } catch (error) {
    console.error('Error checking interest:', error);
    return NextResponse.json({ interested: false });
  }
}