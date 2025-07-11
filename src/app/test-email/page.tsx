'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TestEmailPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const sendTestEmail = async (type: 'welcome' | 'verification') => {
    if (!email) {
      setError('Email is required')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/emails/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || 'Test User',
          type,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
      } else {
        setError(data.error || 'Failed to send email')
      }
    } catch {
      setError('An error occurred while sending the email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Email Testing</h1>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Test Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
          />
        </div>
        
        <div>
          <Label htmlFor="name">Test Name (optional)</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white"
          />
        </div>
        
        <div className="flex gap-4">
          <Button
            onClick={() => sendTestEmail('welcome')}
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Sending...' : 'Send Welcome Email'}
          </Button>
          
          <Button
            onClick={() => sendTestEmail('verification')}
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            {loading ? 'Sending...' : 'Send Verification Email'}
          </Button>
        </div>
        
        {message && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">{message}</p>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h3>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Add your SendGrid API key to .env.local</li>
          <li>2. Update SENDGRID_FROM_EMAIL with your verified sender email</li>
          <li>3. Test the email functionality using this page</li>
          <li>4. Remove this test page before deploying to production</li>
        </ol>
      </div>
    </div>
  )
}