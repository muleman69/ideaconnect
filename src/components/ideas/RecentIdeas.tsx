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

  useEffect(() => {
    fetchRecentIdeas();
  }, []);

  const fetchRecentIdeas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ideas?limit=6');
      if (!response.ok) {
        throw new Error('Failed to fetch recent ideas');
      }
      const data = await response.json();
      
      // Handle empty database gracefully
      if (data.isEmpty) {
        setIdeas([]);
        setError(data.message || 'No ideas available yet. Check back soon!');
      } else {
        setIdeas(data.ideas || []);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading Ideas...
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="text-sm text-gray-500 mb-4">
              💡 Ideas sync automatically every day at 9 AM UTC
            </div>
            <button 
              onClick={fetchRecentIdeas}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors text-sm"
            >
              Refresh
            </button>
          </div>
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
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fresh Ideas Loading...
            </h3>
            <p className="text-gray-600 mb-4">
              We&#39;re syncing the latest startup ideas from IdeaBrowser.com. Check back in a few minutes!
            </p>
            <div className="text-sm text-gray-500">
              💡 Ideas sync automatically every day at 9 AM UTC
            </div>
          </div>
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