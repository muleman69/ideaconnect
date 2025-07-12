"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, User, Search, MessageSquare, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function Navigation() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">IdeaConnect</span>
            </Link>
          </div>
          
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/ideas" className="text-gray-700 hover:text-gray-900 font-medium">
                  Browse Ideas
                </Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
                  Dashboard
                </Link>
                <Link href="/messages" className="text-gray-700 hover:text-gray-900 font-medium flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/search">
                    <Search className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/ideas/create">Post Idea</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/login" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors ml-4"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}