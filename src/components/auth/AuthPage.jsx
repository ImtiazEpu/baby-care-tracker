import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GoogleSignInButton from './GoogleSignInButton';
import EmailOtpForm from './EmailOtpForm';
import AuthDivider from './AuthDivider';

const BabyIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16">
    <defs>
      <linearGradient id="authBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6366f1' }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#authBgGrad)" />
    <circle cx="50" cy="52" r="28" fill="#fcd9b6" />
    <ellipse cx="50" cy="30" rx="20" ry="12" fill="#4a3728" />
    <circle cx="38" cy="32" r="6" fill="#4a3728" />
    <circle cx="62" cy="32" r="6" fill="#4a3728" />
    <circle cx="42" cy="50" r="4" fill="#1f2937" />
    <circle cx="58" cy="50" r="4" fill="#1f2937" />
    <circle cx="43" cy="49" r="1.5" fill="white" />
    <circle cx="59" cy="49" r="1.5" fill="white" />
    <circle cx="35" cy="58" r="5" fill="#ffb6c1" opacity="0.6" />
    <circle cx="65" cy="58" r="5" fill="#ffb6c1" opacity="0.6" />
    <path d="M 42 62 Q 50 70 58 62" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="50" cy="72" rx="8" ry="5" fill="#60a5fa" />
    <circle cx="50" cy="72" r="3" fill="#3b82f6" />
  </svg>
);

const AuthPage = () => {
  const { user, loading, signInWithGoogle, sendOtpEmail, error, clearError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    clearError();
    try {
      await signInWithGoogle();
      // Navigation happens automatically via the Navigate component when user state updates
    } catch {
      // Error is handled in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmailLink = async (email) => {
    clearError();
    await sendOtpEmail(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-mesh p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BabyIcon />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            MyBabyCare
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Track your baby&apos;s growth and milestones
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Sign in to continue
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <GoogleSignInButton
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          />

          <AuthDivider />

          <EmailOtpForm
            onSendLink={handleSendEmailLink}
            disabled={isLoading}
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          By signing in, you agree to sync your data securely to the cloud.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
