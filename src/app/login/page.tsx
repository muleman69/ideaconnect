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
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LoginForm />
        </div>
        
        <div className="text-center mt-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}