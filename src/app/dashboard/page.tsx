'use client';

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, Users, MessageCircle, TrendingUp, ArrowRight, Star, Plus } from 'lucide-react'
import { IdeaCard } from '@/components/ideas/IdeaCard'

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string } } | null>(null)
  const [loading, setLoading] = useState(true)
  const [userInterestedIdeas, setUserInterestedIdeas] = useState<string[]>(['1', '4'])
  
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        redirect('/login')
        return
      }
      
      setUser(user)
      setLoading(false)
    }
    
    checkUser()
  }, [])
  
  const handleInterestToggle = (ideaId: string) => {
    setUserInterestedIdeas(prev => 
      prev.includes(ideaId) 
        ? prev.filter(id => id !== ideaId)
        : [...prev, ideaId]
    )
    console.log('Interest toggled for idea:', ideaId)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!user) {
    return null // Will redirect
  }

  // Mock data for now - will be replaced with real data later
  const featuredIdea = {
    id: '1',
    title: 'AI-Powered Personal Finance Assistant',
    description: 'A smart financial advisor that uses machine learning to provide personalized investment recommendations and budget optimization. The platform would analyze spending patterns, market trends, and individual goals to offer tailored financial advice.',
    category: 'FinTech',
    difficultyLevel: 3,
    marketSize: 'Large',
    sourceUrl: 'https://ideabrowser.com/ideas/ai-finance-assistant',
    featuredDate: new Date(),
    isFeatured: true,
    interestCount: 24,
    discussionCount: 8,
    teamCount: 2,
    createdAt: new Date('2024-01-10')
  }

  const recentIdeas = [
    {
      id: '2',
      title: 'Virtual Reality Fitness Platform',
      description: 'Immersive workout experiences in virtual worlds with real-time performance tracking and social challenges.',
      category: 'Health & Fitness',
      difficultyLevel: 4,
      marketSize: 'Medium',
      interestCount: 18,
      discussionCount: 5,
      teamCount: 1,
      createdAt: new Date('2024-01-09')
    },
    {
      id: '3',
      title: 'Smart Home Energy Optimizer',
      description: 'AI-driven system to reduce household energy consumption through intelligent device management.',
      category: 'GreenTech',
      difficultyLevel: 2,
      marketSize: 'Large',
      interestCount: 15,
      discussionCount: 3,
      teamCount: 0,
      createdAt: new Date('2024-01-08')
    },
    {
      id: '4',
      title: 'Collaborative Learning Platform',
      description: 'Peer-to-peer skill sharing and mentorship network with gamification elements.',
      category: 'Education',
      difficultyLevel: 3,
      marketSize: 'Medium',
      interestCount: 22,
      discussionCount: 12,
      teamCount: 3,
      createdAt: new Date('2024-01-07')
    }
  ]

  const userStats = {
    ideasInterested: 5,
    activeTeams: 2,
    connections: 12
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.user_metadata?.name || user.email?.split('@')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Discover new startup ideas and connect with fellow entrepreneurs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ideas You&#39;re Interested In</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.ideasInterested}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.activeTeams}</div>
              <p className="text-xs text-muted-foreground">
                Currently collaborating
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connections</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.connections}</div>
              <p className="text-xs text-muted-foreground">
                Fellow entrepreneurs
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Featured Idea */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Today&#39;s Featured Idea</h2>
                  <p className="text-muted-foreground">Handpicked startup opportunity from IdeaBrowser</p>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Badge>
              </div>
              
              <IdeaCard 
                idea={featuredIdea}
                variant="featured"
                isInterested={userInterestedIdeas.includes(featuredIdea.id)}
                onInterestToggle={handleInterestToggle}
              />
            </div>

            {/* Recent Ideas */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Recent Ideas</h2>
                  <p className="text-muted-foreground">Latest startup opportunities from the community</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/ideas">
                    Browse All Ideas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-6">
                {recentIdeas.map((idea) => (
                  <IdeaCard 
                    key={idea.id}
                    idea={idea}
                    variant="compact"
                    isInterested={userInterestedIdeas.includes(idea.id)}
                    onInterestToggle={handleInterestToggle}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/ideas">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Browse Ideas
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Find Co-founders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join Discussions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Submit Idea
                </Button>
              </CardContent>
            </Card>

            {/* My Interested Ideas */}
            <Card>
              <CardHeader>
                <CardTitle>My Interested Ideas</CardTitle>
                <CardDescription>Ideas you&#39;ve shown interest in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">AI Finance Assistant</p>
                      <p className="text-xs text-muted-foreground">FinTech • 24 interested</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/ideas/1">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">Learning Platform</p>
                      <p className="text-xs text-muted-foreground">Education • 22 interested</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/ideas/4">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <p className="font-medium">Sarah M. joined your team</p>
                    <p className="text-muted-foreground">AI Finance Assistant • 2 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">New comment on discussion</p>
                    <p className="text-muted-foreground">VR Fitness Platform • 4 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Mike D. showed interest</p>
                    <p className="text-muted-foreground">Learning Platform • 1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}