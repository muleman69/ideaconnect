import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { IdeaCard } from '@/components/ideas/IdeaCard'
import { Search, Filter, SortAsc } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

// Interface for the idea data structure
interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficultyLevel?: number;
  marketSize?: string;
  sourceUrl?: string;
  featuredDate?: Date | string;
  isFeatured?: boolean;
  interestCount?: number;
  discussionCount?: number;
  teamCount?: number;
  createdAt: Date | string;
}

async function getIdeas(): Promise<Idea[]> {
  try {
    const ideas = await prisma.idea.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        },
        interests: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            }
          }
        },
        _count: {
          select: {
            interests: true,
            discussions: true,
            teams: true
          }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 20
    });

    return ideas.map((idea: any) => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      category: idea.category,
      difficultyLevel: idea.difficultyLevel,
      marketSize: idea.marketSize,
      sourceUrl: idea.sourceUrl,
      featuredDate: idea.featuredDate ? new Date(idea.featuredDate) : undefined,
      isFeatured: idea.isFeatured,
      interestCount: idea._count?.interests || 0,
      discussionCount: idea._count?.discussions || 0,
      teamCount: idea._count?.teams || 0,
      createdAt: new Date(idea.createdAt)
    }));
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return [];
  }
}

export default async function IdeasPage() {
  const ideas = await getIdeas();

  // Show empty state with sync suggestion
  if (ideas.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Ideas Found</h2>
          <p className="text-gray-600 mb-4">
            It looks like the database is empty. You need to sync ideas from IdeaBrowser.com first.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6">
            <p className="text-blue-800 font-medium mb-2">To get real IdeaBrowser data:</p>
            <Link 
              href="/api/sync/ideabrowser"
              className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
            >
              Sync Ideas Now
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Or use the "Sync New Ideas" button on the homepage
          </p>
        </div>
      </div>
    )
  }

  const categories = ['All', 'FinTech', 'Health & Fitness', 'GreenTech', 'Education', 'Blockchain', 'Marketplace']

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Browse Ideas
          </h1>
          <p className="text-muted-foreground">
            Discover startup opportunities and find your next big project
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search ideas..." 
                className="pl-10"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ideas.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ideas.reduce((sum, idea) => sum + (idea.interestCount || 0), 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ideas.reduce((sum, idea) => sum + (idea.teamCount || 0), 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ideas.reduce((sum, idea) => sum + (idea.discussionCount || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard 
              key={idea.id}
              idea={idea}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Ideas
          </Button>
        </div>
      </div>
    </div>
  )
}