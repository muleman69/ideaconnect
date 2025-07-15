import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { emailService } from '@/lib/emails/email-service';
import { validateRequiredFields, handleApiError, AppError } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

// Create admin client with service role
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate required fields
    validateRequiredFields({ email, password }, ['email', 'password']);

    logger.info('Creating new user account', { email });

    // Create user with admin client (bypasses email confirmation)
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Mark email as confirmed immediately
      user_metadata: {
        name: name || email.split('@')[0],
      }
    });

    if (error) {
      logger.error(`Supabase admin signup error for ${email}: ${error.message}`);
      throw new AppError(error.message, 400, 'SIGNUP_ERROR');
    }

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail({
        email,
        name: name || email.split('@')[0],
      });
      logger.info('Welcome email sent successfully', { email });
    } catch (emailError) {
      logger.warn(`Failed to send welcome email to ${email}: ${(emailError as Error).message}`);
    }

    logger.info('User account created successfully', { email, userId: data.user?.id });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: data.user
    });

  } catch (error) {
    return handleApiError(error, 'user-signup');
  }
} 