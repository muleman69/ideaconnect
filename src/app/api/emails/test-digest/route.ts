import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/emails/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email, userFirstName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const mockDigestData = {
      userFirstName: userFirstName || 'there',
      hotIdeas: [
        {
          id: '1',
          title: 'AI-Powered Fitness Coach',
          description: 'A mobile app that uses AI to create personalized workout plans and provides real-time form correction.',
          author: 'Alex Johnson',
          category: 'Health & Fitness',
          engagementCount: 42,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/ideas/ai-fitness-coach`,
        },
        {
          id: '2',
          title: 'Smart Home Energy Manager',
          description: 'IoT device that optimizes energy usage and reduces electricity bills through intelligent automation.',
          author: 'Sarah Chen',
          category: 'Smart Home',
          engagementCount: 38,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/ideas/smart-energy-manager`,
        },
        {
          id: '3',
          title: 'Local Food Sharing Network',
          description: 'Platform connecting neighbors to share excess food and reduce food waste in communities.',
          author: 'Mike Rodriguez',
          category: 'Sustainability',
          engagementCount: 35,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/ideas/food-sharing-network`,
        },
        {
          id: '4',
          title: 'Virtual Reality Learning Platform',
          description: 'VR-based educational platform that makes learning immersive and engaging for students.',
          author: 'Emily Davis',
          category: 'EdTech',
          engagementCount: 31,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/ideas/vr-learning-platform`,
        },
        {
          id: '5',
          title: 'Blockchain Supply Chain Tracker',
          description: 'Transparent supply chain tracking system using blockchain technology for authenticity verification.',
          author: 'David Kim',
          category: 'Blockchain',
          engagementCount: 28,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/ideas/blockchain-supply-chain`,
        },
      ],
      potentialMatches: [
        {
          id: 'user-1',
          name: 'Jessica Martinez',
          skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
          interests: ['HealthTech', 'Mobile Apps', 'User Experience'],
          profileUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/jessica-martinez`,
          matchReason: 'Shares your interest in HealthTech and has complementary design skills',
        },
        {
          id: 'user-2',
          name: 'Thomas Anderson',
          skills: ['React', 'Node.js', 'MongoDB', 'DevOps'],
          interests: ['Web Development', 'Full Stack', 'Cloud Computing'],
          profileUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/thomas-anderson`,
          matchReason: 'Full-stack developer looking for technical co-founder opportunities',
        },
        {
          id: 'user-3',
          name: 'Lisa Wang',
          skills: ['Marketing', 'SEO', 'Content Strategy', 'Analytics'],
          interests: ['Digital Marketing', 'Growth Hacking', 'Data Analysis'],
          profileUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile/lisa-wang`,
          matchReason: 'Marketing expert who could help with user acquisition and growth',
        },
      ],
      weeklyStats: {
        totalIdeas: 47,
        totalUsers: 128,
        totalConnections: 23,
        topCategory: 'AI/ML',
      },
    };

    const success = await emailService.sendWeeklyDigestEmail({
      email,
      digestData: mockDigestData,
    });

    if (success) {
      return NextResponse.json({ message: 'Test weekly digest email sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in test digest email endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}