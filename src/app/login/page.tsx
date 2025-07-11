import { LoginForm } from '@/components/auth/login-form'
import { Lightbulb } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Lightbulb className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">IdeaConnect</span>
          </Link>
          <p className="mt-2 text-gray-600">Welcome back</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <LoginForm />
        </div>
        
        <div className="text-center mt-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}