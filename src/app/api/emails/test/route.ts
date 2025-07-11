import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/emails/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email, type = 'welcome', name = 'Test User' } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    let success = false;

    switch (type) {
      case 'welcome':
        success = await emailService.sendWelcomeEmail({
          email,
          name,
        });
        break;
      
      case 'verification':
        const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=test-token`;
        success = await emailService.sendVerificationEmail({
          email,
          name,
          verificationUrl,
        });
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json(
        { message: `Test ${type} email sent successfully to ${email}` },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: `Failed to send test ${type} email` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in test email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}