import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
            Welcome to IdeaConnect
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Connect with entrepreneurs and build amazing ideas together
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}