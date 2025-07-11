import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/emails/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const success = await emailService.sendWelcomeEmail({
      email,
      name,
    });

    if (success) {
      return NextResponse.json(
        { message: 'Welcome email sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in send-welcome API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}