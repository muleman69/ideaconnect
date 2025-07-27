import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{user.user_metadata?.name || 'Not set'}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Complete Your Profile</h3>
              <p className="text-blue-800 text-sm mb-3">
                Add your skills, interests, and what you&#39;re looking for to get better matches with potential co-founders.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-sm text-blue-800">Email verified</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">○</span>
                  <span className="text-sm text-gray-600">Add your skills and interests</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">○</span>
                  <span className="text-sm text-gray-600">Write a brief bio</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">○</span>
                  <span className="text-sm text-gray-600">Browse your first idea</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="/dashboard" 
                className="block bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Go to Dashboard
              </a>
              <Link 
                href="/ideas" 
                className="block bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
              >
                Browse Ideas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 