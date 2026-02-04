import { useState, useEffect } from 'react';
import { EnvelopeIcon, ArrowPathIcon, CheckCircleIcon, InboxIcon } from '@heroicons/react/24/outline';
import { getErrorMessage } from '../../utils/errorMessages';

const EmailOtpForm = ({ onSendLink, disabled }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setSending(true);
    try {
      await onSendLink(email);
      setSent(true);
      setResendCountdown(60); // 60 seconds before resend
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;

    setSending(true);
    setError('');
    try {
      await onSendLink(email);
      setResendCountdown(60);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-4">
        {/* Success Header */}
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mx-auto">
              <EnvelopeIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-4 h-4 text-white" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
            Check your inbox
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300 mb-1">
            We sent a magic link to
          </p>
          <p className="font-semibold text-green-800 dark:text-green-200">
            {email}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <InboxIcon className="w-5 h-5 text-indigo-500" />
            How to sign in:
          </h4>
          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-7 list-decimal">
            <li>Open the email from <strong>My Baby Care</strong></li>
            <li>Click the <strong>"Sign in"</strong> button in the email</li>
            <li>You'll be automatically signed in</li>
          </ol>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Can't find the email?</strong> Check your spam or junk folder.
            The email is sent from <span className="font-medium">noreply@mybabycare.app</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleResend}
            disabled={resendCountdown > 0 || sending}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : resendCountdown > 0 ? (
              <>
                <ArrowPathIcon className="w-5 h-5" />
                Resend in {resendCountdown}s
              </>
            ) : (
              <>
                <ArrowPathIcon className="w-5 h-5" />
                Resend link
              </>
            )}
          </button>

          <button
            onClick={() => {
              setSent(false);
              setEmail('');
              setError('');
            }}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Use a different email
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email address
        </label>
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={disabled || sending}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          We'll send you a magic link to sign in instantly
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={disabled || sending || !email}
        className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
      >
        {sending ? (
          <>
            <ArrowPathIcon className="w-5 h-5 animate-spin" />
            Sending magic link...
          </>
        ) : (
          <>
            <EnvelopeIcon className="w-5 h-5" />
            Send Magic Link
          </>
        )}
      </button>
    </form>
  );
};

export default EmailOtpForm;
