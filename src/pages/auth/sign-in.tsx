import { Card } from '@/components/ui/card';
import { UserAuthForm } from './components/user-auth-form';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 md:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, var(--brand-color-right), var(--brand-color-left)), url('/lady-bg.webp')`,
      }}
    >
      <div className="w-full max-w-2xl">
        <Card className="p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              width={120}
              alt="pamtech logo"
            />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              User Login
            </h2>
            <p className="text-sm text-gray-600 dark:text-white">
              Welcome back
            </p>
          </div>

          <UserAuthForm />

          <p className="text-center text-sm text-gray-600 dark:text-white mt-6">
            Don't have an account?{' '}
            <Link
              to="/sign-up"
              className="text-blue-600 underline hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600 dark:text-white mt-6">
            Return to {' '}
            <Link
              to="/"
              className="text-blue-600 underline hover:text-blue-300"
            >
              Home page
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
