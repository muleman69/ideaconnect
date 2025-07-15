// Removed unused NextRequest import
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  if (params.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(params.code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      redirect('/login?error=Could not authenticate user')
    }
  }

  // Redirect to dashboard after successful authentication
  redirect('/dashboard')
} 