import { NextRequest, NextResponse } from 'next/server';
import { handleUserSignup, handleEmailVerification } from '@/lib/auth/signup-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify webhook signature if needed (recommended for production)
    // const signature = request.headers.get('authorization');
    // if (!verifyWebhookSignature(signature, body)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const { type, record } = body;

    switch (type) {
      case 'INSERT':
        // Handle new user signup
        if (record.email) {
          await handleUserSignup(
            record.id,
            record.email,
            record.user_metadata?.name || record.user_metadata?.full_name
          );
        }
        break;

      case 'UPDATE':
        // Handle email verification or profile updates
        if (record.email_confirmed_at && record.email) {
          await handleEmailVerification(
            record.id,
            record.email,
            record.user_metadata?.name || record.user_metadata?.full_name
          );
        }
        break;

      default:
        console.log(`Unhandled webhook type: ${type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in auth webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}