'use client';

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, Users, MessageCircle, TrendingUp, ArrowRight, Star, Plus } from 'lucide-react'
import { IdeaCard } from '@/components/ideas/IdeaCard'

interface FeaturedIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
  marketSize: string;
  sourceUrl?: string;
  interestCount: number;
  discussionCount: number;
  teamCount: number;
  createdAt: Date;
}

interface RecentIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
  marketSize: string;
  interestCount: number;
  discussionCount: number;
  teamCount: number;
  createdAt: Date;
}

interface UserStats {
  ideasInterested: number;
  activeTeams: number;
  connections: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string } } | null>(null)
  const [loading, setLoading] = useState(true)
  const [featuredIdea, setFeaturedIdea] = useState<FeaturedIdea | null>(null)
  const [recentIdeas, setRecentIdeas] = useState<RecentIdea[]>([])
  const [userStats, setUserStats] = useState<UserStats>({ ideasInterested: 0, activeTeams: 0, connections: 0 })
  const [userInterestedIdeas, setUserInterestedIdeas] = useState<string[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
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

  const fetchDashboardData = useCallback(async () => {
    try {
      setDataLoading(true)
      setError(null)

      // Fetch featured idea
      const featuredResponse = await fetch('/api/ideas/featured')
      if (featuredResponse.ok) {
        const featuredData = await featuredResponse.json()
        setFeaturedIdea(featuredData.idea)
      }

      // Fetch recent ideas
      const ideasResponse = await fetch('/api/ideas?limit=3')
      if (ideasResponse.ok) {
        const ideasData = await ideasResponse.json()
        setRecentIdeas(ideasData.ideas || [])
      }

      // TODO: Fetch real user stats when endpoints are available
      // For now, use placeholder values
      setUserStats({
        ideasInterested: userInterestedIdeas.length,
        activeTeams: 0, // Will be replaced with real data
        connections: 0  // Will be replaced with real data
      })

    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError('Failed to load dashboard data')
    } finally {
      setDataLoading(false)
    }
  }, [userInterestedIdeas.length])

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user, fetchDashboardData])
  
  const handleInterestToggle = async (ideaId: string) => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/interest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update local state
        setUserInterestedIdeas(prev => 
          data.interested 
            ? [...prev, ideaId]
            : prev.filter(id => id !== ideaId)
        )

        // Refresh dashboard data to get updated counts
        fetchDashboardData()
      } else {
        console.error('Failed to toggle interest')
      }
    } catch (err) {
      console.error('Error toggling interest:', err)
    }
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

  // Show loading state while fetching data
  if (dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if data failed to load
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Try Again</Button>
          </div>
        </div>
      </div>
    )
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
              
              {featuredIdea ? (
                <IdeaCard 
                  idea={featuredIdea}
                  variant="featured"
                  isInterested={userInterestedIdeas.includes(featuredIdea.id)}
                  onInterestToggle={handleInterestToggle}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <p className="text-gray-500">No featured idea available</p>
                </div>
              )}
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
                {recentIdeas.length > 0 ? (
                  recentIdeas.map((idea) => (
                    <IdeaCard 
                      key={idea.id}
                      idea={idea}
                      variant="compact"
                      isInterested={userInterestedIdeas.includes(idea.id)}
                      onInterestToggle={handleInterestToggle}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                    <p className="text-gray-500">No recent ideas available</p>
                    <p className="text-sm text-gray-400 mt-2">Check back later for new startup opportunities!</p>
                  </div>
                )}
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