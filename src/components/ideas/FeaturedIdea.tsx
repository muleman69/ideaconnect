'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Users, ExternalLink } from 'lucide-react';

interface User {
  id: string;
  name: string;
  imageUrl: string;
}

interface Discussion {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}

interface FeaturedIdeaData {
  id: string;
  title: string;
  description: string;
  category: string;
  sourceUrl?: string;
  difficultyLevel?: number;
  marketSize?: string;
  interests: {
    user: User;
  }[];
  discussions: Discussion[];
  _count: {
    interests: number;
    discussions: number;
    teams: number;
  };
}

export default function FeaturedIdea() {
  const [idea, setIdea] = useState<FeaturedIdeaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchFeaturedIdea();
  }, []);

  const fetchFeaturedIdea = async () => {
    try {
      const response = await fetch('/api/ideas/featured');
      if (!response.ok) {
        throw new Error('Failed to fetch featured idea');
      }
      const data = await response.json();
      
      // Handle empty database gracefully
      if (data.isEmpty) {
        setIdea(null);
        setError(data.message || 'No ideas available yet. Check back soon!');
      } else {
        setIdea(data.idea);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Today&apos;s Idea</h2>
              <p className="text-blue-100">
                Discover, discuss, and collaborate on innovative concepts
              </p>
            </div>
          </div>
        </div>
        <div className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ideas Coming Soon!
            </h3>
            <p className="text-gray-600 mb-4">
              {error || 'We\'re syncing fresh startup ideas from IdeaBrowser.com. Check back in a few minutes for exciting new opportunities!'}
            </p>
            <div className="text-sm text-gray-500">
              💡 Ideas sync automatically every day at 9 AM UTC
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (level?: number) => {
    if (!level) return 'bg-gray-100 text-gray-800';
    if (level <= 3) return 'bg-green-100 text-green-800';
    if (level <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyText = (level?: number) => {
    if (!level) return 'Unknown';
    if (level <= 3) return 'Easy';
    if (level <= 6) return 'Medium';
    return 'Hard';
  };

  const shouldTruncate = idea.description.length > 200;
  const displayDescription = showFullDescription ? idea.description : truncateText(idea.description);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Today&apos;s Idea</h2>
            <p className="text-blue-100">
              Discover, discuss, and collaborate on innovative concepts
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Heart className="h-5 w-5" />
                <span className="font-semibold">{idea._count.interests}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">{idea._count.discussions}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5" />
                <span className="font-semibold">{idea._count.teams}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {idea.title}
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {idea.category}
              </span>
              {idea.difficultyLevel && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(idea.difficultyLevel)}`}>
                  {getDifficultyText(idea.difficultyLevel)}
                </span>
              )}
              {idea.marketSize && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {idea.marketSize} Market
                </span>
              )}
            </div>
          </div>
          {idea.sourceUrl && (
            <a
              href={idea.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">Source</span>
            </a>
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {displayDescription}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 transition-colors"
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {idea.interests.slice(0, 5).map((interest) => (
              <div
                key={interest.user.id}
                className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white"
              >
                {interest.user.imageUrl ? (
                  <img
                    src={interest.user.imageUrl}
                    alt={interest.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {interest.user.name[0]}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {idea.interests.length > 5 && (
              <div className="relative w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{idea.interests.length - 5}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              href={`/ideas/${idea.id}`}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
            >
              View Details
            </Link>
            <Link
              href={`/ideas/${idea.id}#discussions`}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-md font-medium transition-colors"
            >
              Join Discussion
            </Link>
          </div>
        </div>

        {idea.discussions.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Discussions
            </h4>
            <div className="space-y-4">
              {idea.discussions.slice(0, 3).map((discussion) => (
                <div key={discussion.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    {discussion.user.imageUrl ? (
                      <img
                        src={discussion.user.imageUrl}
                        alt={discussion.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {discussion.user.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {discussion.user.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(discussion.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {discussion.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}