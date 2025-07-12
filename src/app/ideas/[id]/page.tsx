'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Heart, 
  MessageCircle, 
  Users, 
  ExternalLink, 
  ArrowLeft, 
  Calendar,
  Tag,
  TrendingUp,
  Share2
} from 'lucide-react';
import InterestButton from '@/components/ideas/InterestButton';
import DiscussionThread from '@/components/ideas/DiscussionThread';

interface User {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
  skills?: string[];
}

interface Discussion {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  replies: Discussion[];
}

interface Team {
  id: string;
  name: string;
  description?: string;
  createdBy: User;
  members: {
    user: User;
    role: string;
  }[];
}

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  sourceUrl?: string;
  difficultyLevel?: number;
  marketSize?: string;
  featuredDate?: string;
  createdAt: string;
  author?: User;
  interests: {
    user: User;
  }[];
  discussions: Discussion[];
  teams: Team[];
  _count: {
    interests: number;
    discussions: number;
    teams: number;
  };
}

export default function IdeaDetailPage() {
  const params = useParams();
  const ideaId = params.id as string;
  
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInterested, setIsInterested] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'discussions' | 'teams'>('overview');

  useEffect(() => {
    if (ideaId) {
      fetchIdea();
      checkInterestStatus();
    }
  }, [ideaId]);

  const fetchIdea = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/ideas/${ideaId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch idea');
      }
      const data = await response.json();
      setIdea(data.idea);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const checkInterestStatus = async () => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/interest`);
      if (response.ok) {
        const data = await response.json();
        setIsInterested(data.interested);
      }
    } catch (err) {
      console.error('Failed to check interest status:', err);
    }
  };

  const handleInterestToggle = async () => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/interest`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        setIsInterested(data.interested);
        // Refresh idea to update counts
        fetchIdea();
      }
    } catch (err) {
      console.error('Failed to toggle interest:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: idea?.title,
          text: idea?.description,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">{error || 'Idea not found'}</p>
          <Link
            href="/ideas"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Back to Ideas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/ideas"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Ideas
        </Link>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {idea.title}
            </h1>
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
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <InterestButton
              isInterested={isInterested}
              onToggle={handleInterestToggle}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">{idea._count.interests}</span>
          </div>
          <p className="text-gray-600">People Interested</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{idea._count.discussions}</span>
          </div>
          <p className="text-gray-600">Discussions</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">{idea._count.teams}</span>
          </div>
          <p className="text-gray-600">Teams Formed</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'discussions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Discussions ({idea._count.discussions})
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'teams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Teams ({idea._count.teams})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {idea.description}
              </p>
              
              {idea.sourceUrl && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Source</h3>
                  <a
                    href={idea.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Original Idea
                  </a>
                </div>
              )}

              {idea.author && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Created By</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {idea.author.imageUrl ? (
                        <img
                          src={idea.author.imageUrl}
                          alt={idea.author.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600">
                            {idea.author.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{idea.author.name}</p>
                      {idea.author.bio && (
                        <p className="text-sm text-gray-600">{idea.author.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'discussions' && (
            <DiscussionThread ideaId={idea.id} discussions={idea.discussions} />
          )}

          {activeTab === 'teams' && (
            <div className="space-y-6">
              {idea.teams.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No teams formed yet for this idea.</p>
                  <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">
                    Form a Team
                  </button>
                </div>
              ) : (
                idea.teams.map((team) => (
                  <div key={team.id} className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {team.name}
                    </h3>
                    {team.description && (
                      <p className="text-gray-700 mb-4">{team.description}</p>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {team.members.map((member) => (
                          <div
                            key={member.user.id}
                            className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                          >
                            {member.user.imageUrl ? (
                              <img
                                src={member.user.imageUrl}
                                alt={member.user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  {member.user.name[0]}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {team.members.length} members
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Interested Users */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Interested Users ({idea.interests.length})
            </h3>
            {idea.interests.length === 0 ? (
              <p className="text-gray-600 text-sm">No one has shown interest yet.</p>
            ) : (
              <div className="space-y-3">
                {idea.interests.slice(0, 10).map((interest) => (
                  <div key={interest.user.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
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
                    <span className="text-sm text-gray-900">{interest.user.name}</span>
                  </div>
                ))}
                {idea.interests.length > 10 && (
                  <p className="text-sm text-gray-600">
                    +{idea.interests.length - 10} more
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Created {new Date(idea.createdAt).toLocaleDateString()}
                </span>
              </div>
              {idea.featuredDate && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Featured on {new Date(idea.featuredDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{idea.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}