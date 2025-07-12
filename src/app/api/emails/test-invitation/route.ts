import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/emails/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email, recipientName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const mockInvitationData = {
      inviterName: 'Sarah Chen',
      inviterEmail: 'sarah@example.com',
      teamName: 'GreenTech Innovators',
      teamDescription: 'We\'re building the next generation of sustainable technology solutions to combat climate change and create a greener future.',
      role: 'Full Stack Developer',
      projectDescription: 'Our current project is a smart energy management system that helps households reduce their carbon footprint by optimizing energy usage through AI-powered insights and automation.',
      teamMembers: [
        {
          name: 'Sarah Chen',
          role: 'Product Manager & Founder',
          skills: ['Product Strategy', 'Market Research', 'Team Leadership', 'Sustainability'],
        },
        {
          name: 'Michael Torres',
          role: 'UI/UX Designer',
          skills: ['Figma', 'User Research', 'Design Systems', 'Prototyping'],
        },
        {
          name: 'Emma Johnson',
          role: 'Data Scientist',
          skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
        },
      ],
      invitationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/invitations/greentech-innovators-123`,
      inviterProfileUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/sarah-chen`,
      personalMessage: 'Hi! I came across your profile and was impressed by your full-stack development skills and passion for sustainability. We\'re at a crucial stage where we need someone with your technical expertise to help us build the core platform. Would love to have you join our mission to make the world a greener place!',
    };

    const success = await emailService.sendTeamInvitationEmail({
      email,
      recipientName,
      invitationData: mockInvitationData,
    });

    if (success) {
      return NextResponse.json({ message: 'Test team invitation email sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in test invitation email endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}