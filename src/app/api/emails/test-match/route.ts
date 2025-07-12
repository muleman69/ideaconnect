import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/emails/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email, recipientName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const mockMatchData = {
      matcherName: 'Alex Johnson',
      matcherEmail: 'alex@example.com',
      ideaName: 'AI-Powered Fitness Coach',
      ideaDescription: 'A mobile app that uses AI to create personalized workout plans and provides real-time form correction using computer vision.',
      matcherSkills: ['React Native', 'AI/ML', 'Product Design', 'User Research'],
      matcherMessage: 'Hi! I saw your profile and think your backend expertise would be perfect for this project. Would love to chat about building something amazing together!',
      ideaUrl: `${process.env.NEXT_PUBLIC_APP_URL}/ideas/ai-fitness-coach`,
      matcherProfileUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/alex-johnson`,
    };

    const success = await emailService.sendIdeaMatchEmail({
      email,
      recipientName,
      matchData: mockMatchData,
    });

    if (success) {
      return NextResponse.json({ message: 'Test idea match email sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in test match email endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}