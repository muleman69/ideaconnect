export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 mb-6">
            At IdeaConnect, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information when you use our platform.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Email address and name when you create an account</li>
            <li>Profile information you choose to share (skills, bio, location)</li>
            <li>Usage data to improve our platform</li>
            <li>Communication preferences for notifications</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>To provide and maintain our platform</li>
            <li>To match you with potential co-founders and collaborators</li>
            <li>To send you relevant notifications and updates</li>
            <li>To improve our services and user experience</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement industry-standard security measures to protect your personal information. Your data is encrypted and stored securely.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of promotional communications</li>
            <li>Request a copy of your data</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this privacy policy, please contact us at{' '}
            <a href="mailto:privacy@ideaconnect.co" className="text-blue-600 hover:text-blue-800">
              privacy@ideaconnect.co
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 