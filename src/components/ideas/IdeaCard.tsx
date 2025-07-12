'use client';

import Link from 'next/link';
import { Heart, MessageCircle, Users, ExternalLink } from 'lucide-react';

interface User {
  id: string;
  name: string;
  imageUrl: string;
}

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    category: string;
    sourceUrl?: string;
    difficultyLevel?: number;
    marketSize?: string;
    author?: User;
    interests: {
      user: User;
    }[];
    _count: {
      interests: number;
      discussions: number;
      teams: number;
    };
  };
}

export default function IdeaCard({ idea }: IdeaCardProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <Link 
                href={`/ideas/${idea.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {idea.title}
              </Link>
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {idea.category}
              </span>
              {idea.difficultyLevel && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficultyLevel)}`}>
                  {getDifficultyText(idea.difficultyLevel)}
                </span>
              )}
              {idea.marketSize && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {idea.marketSize}
                </span>
              )}
            </div>
          </div>
          {idea.sourceUrl && (
            <a
              href={idea.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {idea.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{idea._count.interests}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{idea._count.discussions}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{idea._count.teams}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {idea.interests.length > 0 && (
              <div className="flex -space-x-1">
                {idea.interests.slice(0, 3).map((interest) => (
                  <div
                    key={interest.user.id}
                    className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white"
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
                {idea.interests.length > 3 && (
                  <div className="relative w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      +{idea.interests.length - 3}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <Link
              href={`/ideas/${idea.id}`}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>

        {idea.author && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                {idea.author.imageUrl ? (
                  <img
                    src={idea.author.imageUrl}
                    alt={idea.author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {idea.author.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-600">
                Created by {idea.author.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}