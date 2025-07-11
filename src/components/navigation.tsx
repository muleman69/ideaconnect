"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Lightbulb, User, Search, MessageSquare } from 'lucide-react'

export function Navigation() {
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
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/ideas" className="text-gray-600 hover:text-gray-900">
              Browse Ideas
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/messages" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
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
          </div>
        </div>
      </div>
    </nav>
  )
}