export default function UnsubscribePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Unsubscribe</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            We&#39;re sorry to see you go!
          </h2>
          <p className="text-gray-600 mb-6">
            You can manage your email preferences or unsubscribe from our communications below.
          </p>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">
                Before you leave...
              </h3>
              <p className="text-yellow-700 text-sm">
                Consider adjusting your email preferences instead of unsubscribing completely. 
                You can choose to receive only the most important updates.
              </p>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Manage Email Preferences
              </button>
              <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Unsubscribe from All Emails
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:support@ideaconnect.co" className="text-blue-600 hover:text-blue-800">
                support@ideaconnect.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 