// import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { emailService } from '@/lib/emails/email-service';

export async function handleUserSignup(supabaseUserId: string, email: string, name?: string) {
  try {
    // Create user in our database
    const user = await prisma.user.create({
      data: {
        supabaseId: supabaseUserId,
        email,
        name,
      },
    });

    // Send welcome email
    const emailSent = await emailService.sendWelcomeEmail({
      email,
      name: name || undefined,
    });

    if (!emailSent) {
      console.warn(`Failed to send welcome email to ${email}`);
    }

    return user;
  } catch (error) {
    console.error('Error in handleUserSignup:', error);
    throw error;
  }
}

export async function handleEmailVerification(supabaseUserId: string, email: string, name?: string) {
  try {
    // Update user email verification status if needed
    await prisma.user.update({
      where: { supabaseId: supabaseUserId },
      data: {
        email,
        name,
        // Add any other fields you want to update on verification
      },
    });

    console.log(`Email verified for user ${supabaseUserId}`);
  } catch (error) {
    console.error('Error in handleEmailVerification:', error);
    throw error;
  }
}