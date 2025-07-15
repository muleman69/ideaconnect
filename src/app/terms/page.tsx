export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using IdeaConnect, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Purpose</h2>
          <p className="text-gray-700 mb-6">
            IdeaConnect is a platform designed to connect entrepreneurs and innovators to collaborate on startup ideas. We facilitate connections and provide tools for project collaboration.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Responsibilities</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Provide accurate and truthful information in your profile</li>
            <li>Respect other users and maintain professional conduct</li>
            <li>Do not spam or harass other users</li>
            <li>Protect your account credentials</li>
            <li>Comply with applicable laws and regulations</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            You retain ownership of any intellectual property you share on the platform. However, by sharing ideas publicly, you grant other users the right to view and discuss these ideas for collaboration purposes.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            IdeaConnect facilitates connections between users but is not responsible for the outcomes of collaborations, business partnerships, or projects that result from platform usage.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Termination</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to terminate accounts that violate these terms or engage in behavior that disrupts the platform community.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
          <p className="text-gray-700 mb-6">
            We may update these terms from time to time. Users will be notified of significant changes via email or platform notifications.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-700">
            For questions about these terms, please contact us at{' '}
            <a href="mailto:legal@ideaconnect.co" className="text-blue-600 hover:text-blue-800">
              legal@ideaconnect.co
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 