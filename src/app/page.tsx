import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Lightbulb, Users, MessageSquare, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Where Innovation Meets
            <span className="text-blue-600 block">Collaboration</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Connect with fellow entrepreneurs, share your revolutionary ideas, and find the perfect co-founders to turn your vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/ideas">Explore Ideas</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ideas/create">Share Your Idea</Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Ideas</h3>
            <p className="text-gray-600">
              Post your innovative concepts and get feedback from a community of entrepreneurs.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Co-founders</h3>
            <p className="text-gray-600">
              Connect with talented individuals who complement your skills and share your vision.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Together</h3>
            <p className="text-gray-600">
              Transform your ideas into successful ventures with the right team and resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
