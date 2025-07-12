import Link from 'next/link'
import { Lightbulb, Users, TrendingUp, Sparkles } from 'lucide-react'
import FeaturedIdea from '@/components/ideas/FeaturedIdea'
import RecentIdeas from '@/components/ideas/RecentIdeas'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Ideas Drive
              <span className="text-blue-600 block">Innovation</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover fresh startup ideas daily, connect with like-minded entrepreneurs, and build the next big thing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/ideas" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Explore All Ideas
            </Link>
            <Link 
              href="/api/sync/ideabrowser" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Sync New Ideas
            </Link>
          </div>
        </div>

        {/* Featured Idea Section */}
        <div className="mb-16">
          <FeaturedIdea />
        </div>

        {/* Recent Ideas Section */}
        <div className="mb-16">
          <RecentIdeas />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Ideas Daily</h3>
            <p className="text-gray-600">
              Discover new startup concepts curated from IdeaBrowser.com every day.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Raise Your Hand</h3>
            <p className="text-gray-600">
              Show interest in ideas and find others who share your passion for specific concepts.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Form Teams</h3>
            <p className="text-gray-600">
              Turn ideas into reality by forming teams with complementary skills and shared vision.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
