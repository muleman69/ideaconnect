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

  const sendTestEmail = async (type: 'welcome' | 'verification' | 'match' | 'digest' | 'invitation') => {
    if (!email) {
      setError('Email is required')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      let endpoint = ''
      let body = {}

      switch (type) {
        case 'welcome':
          endpoint = '/api/emails/send-welcome'
          body = { email, name: name || 'Test User' }
          break
        case 'verification':
          endpoint = '/api/emails/test'
          body = { email, name: name || 'Test User', type: 'verification' }
          break
        case 'match':
          endpoint = '/api/emails/test-match'
          body = { email, recipientName: name || 'Test User' }
          break
        case 'digest':
          endpoint = '/api/emails/test-digest'
          body = { email, userFirstName: name || 'Test User' }
          break
        case 'invitation':
          endpoint = '/api/emails/test-invitation'
          body = { email, recipientName: name || 'Test User' }
          break
        default:
          throw new Error('Invalid email type')
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || `Test ${type} email sent successfully!`)
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => sendTestEmail('welcome')}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Sending...' : '📧 Send Welcome Email'}
          </Button>
          
          <Button
            onClick={() => sendTestEmail('match')}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? 'Sending...' : '🎯 Send Match Email'}
          </Button>
          
          <Button
            onClick={() => sendTestEmail('digest')}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? 'Sending...' : '📊 Send Weekly Digest'}
          </Button>
          
          <Button
            onClick={() => sendTestEmail('invitation')}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Sending...' : '🎉 Send Team Invitation'}
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
      
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-900 mb-4">Email Templates Available:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <strong>📧 Welcome Email:</strong> Sent when new users sign up
          </div>
          <div>
            <strong>🎯 Idea Match:</strong> Notifies when someone wants to collaborate
          </div>
          <div>
            <strong>📊 Weekly Digest:</strong> Weekly roundup of hot ideas and matches
          </div>
          <div>
            <strong>🎉 Team Invitation:</strong> Invites users to join a team
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white border border-blue-200 rounded-md">
          <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Add your SendGrid API key to .env.local</li>
            <li>2. Update SENDGRID_FROM_EMAIL with your verified sender email</li>
            <li>3. Test the email functionality using this page</li>
            <li>4. Remove this test page before deploying to production</li>
          </ol>
        </div>
      </div>
    </div>
  )
}