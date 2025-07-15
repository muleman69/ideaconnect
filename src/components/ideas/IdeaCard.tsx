'use client';

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MessageCircle, Users, ExternalLink, Calendar } from 'lucide-react'

interface IdeaCardProps {
  idea: {
    id: string
    title: string
    description: string
    category: string
    difficultyLevel?: number
    marketSize?: string
    sourceUrl?: string
    featuredDate?: Date | string
    isFeatured?: boolean
    interestCount?: number
    discussionCount?: number
    teamCount?: number
    createdAt: Date | string
  }
  variant?: 'default' | 'featured' | 'compact'
  showActions?: boolean
  onInterestToggle?: (ideaId: string) => void
  isInterested?: boolean
}

const difficultyLabels = {
  1: 'Easy',
  2: 'Medium', 
  3: 'Hard',
  4: 'Expert',
  5: 'Extreme'
}

const difficultyColors = {
  1: 'bg-green-100 text-green-800',
  2: 'bg-blue-100 text-blue-800', 
  3: 'bg-yellow-100 text-yellow-800',
  4: 'bg-orange-100 text-orange-800',
  5: 'bg-red-100 text-red-800'
}

export function IdeaCard({ 
  idea, 
  variant = 'default', 
  showActions = true,
  onInterestToggle,
  isInterested = false 
}: IdeaCardProps) {
  const handleInterestClick = () => {
    if (onInterestToggle) {
      onInterestToggle(idea.id)
    }
  }

  const cardClassName = variant === 'featured' 
    ? "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10" 
    : variant === 'compact'
    ? "hover:shadow-md transition-shadow"
    : "hover:shadow-md transition-shadow"

  return (
    <Card className={cardClassName}>
      <CardHeader className={variant === 'compact' ? 'pb-3' : ''}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{idea.category}</Badge>
              {idea.difficultyLevel && (
                <Badge 
                  variant="secondary" 
                  className={difficultyColors[idea.difficultyLevel as keyof typeof difficultyColors]}
                >
                  {difficultyLabels[idea.difficultyLevel as keyof typeof difficultyLabels]}
                </Badge>
              )}
              {idea.isFeatured && (
                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                  ⭐ Featured
                </Badge>
              )}
            </div>
            <CardTitle className={variant === 'compact' ? 'text-lg' : 'text-xl'}>
              {idea.title}
            </CardTitle>
            {variant !== 'compact' && (
              <CardDescription className="mt-2">
                {idea.description}
              </CardDescription>
            )}
          </div>
          {idea.sourceUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={idea.sourceUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={variant === 'compact' ? 'pt-0' : ''}>
        {variant === 'compact' && idea.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {idea.description}
          </p>
        )}
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {idea.marketSize && (
            <div className="flex items-center gap-1">
              <span>Market: {idea.marketSize}</span>
            </div>
          )}
          {idea.featuredDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {typeof idea.featuredDate === 'string' 
                  ? new Date(idea.featuredDate).toLocaleDateString()
                  : idea.featuredDate.toLocaleDateString()
                }
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{idea.interestCount || 0} interested</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{idea.discussionCount || 0} discussions</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{idea.teamCount || 0} teams</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            <Button 
              variant={isInterested ? "default" : "outline"}
              size="sm"
              onClick={handleInterestClick}
              className="flex-1"
            >
              <Heart className={`h-4 w-4 mr-2 ${isInterested ? 'fill-current' : ''}`} />
              {isInterested ? 'Interested' : 'Show Interest'}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`/ideas/${idea.id}`}>
                View Details
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default IdeaCard