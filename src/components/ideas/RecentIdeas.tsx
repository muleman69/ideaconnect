'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IdeaCard } from './IdeaCard';

interface User {
  id: string;
  name: string;
  imageUrl: string;
}

interface Idea {
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
  createdAt: Date;
  interestCount?: number;
  discussionCount?: number;
  teamCount?: number;
}

export default function RecentIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchRecentIdeas();
  }, []);

  const fetchRecentIdeas = async () => {
    if (!mounted) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/ideas?limit=6');
      if (!response.ok) {
        throw new Error('Failed to fetch recent ideas');
      }
      const data = await response.json();
      
      if (mounted) {
        setIdeas(data.ideas || []);
        setError(null);
      }
    } catch (err) {
      if (mounted) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recent Ideas</h2>
          <Link 
            href="/ideas"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recent Ideas</h2>
          <Link 
            href="/ideas"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recent Ideas</h2>
          <Link 
            href="/ideas"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchRecentIdeas}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Ideas</h2>
        <Link 
          href="/ideas"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </Link>
      </div>
      
      {ideas.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">No ideas available yet.</p>
          <Link
            href="/api/sync/ideabrowser"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Sync Ideas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              onInterestToggle={(ideaId) => {
                console.log('Interest toggled for idea:', ideaId)
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}