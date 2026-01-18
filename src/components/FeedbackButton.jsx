import { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

// Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = 'f61a999e-e6bf-4583-844a-14a3d25c5cb2';

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({
    type: 'feedback',
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: formData.type === 'feature'
            ? `[Feature Request] Baby Care Tracker - ${formData.name}`
            : `[Feedback] Baby Care Tracker - ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          type: formData.type === 'feature' ? 'Feature Request' : 'Feedback',
          message: formData.message,
          app: 'Baby Care & Vaccine Tracker'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ type: 'feedback', name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('error');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset status after closing
    setTimeout(() => setStatus('idle'), 300);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Send Feedback"
        title="Send Feedback"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative glass-card rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Success State */}
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircleSolidIcon className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your feedback has been sent successfully. We appreciate your input!
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      Send Feedback
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We'd love to hear from you!
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Failed to send feedback. Please try again.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Feedback Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`relative px-4 py-3 rounded-xl cursor-pointer text-center transition-all border-2 ${
                        formData.type === 'feedback'
                          ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                          : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 hover:border-indigo-300'
                      }`}>
                        <input
                          type="radio"
                          name="type"
                          value="feedback"
                          checked={formData.type === 'feedback'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {formData.type === 'feedback' && (
                          <CheckCircleSolidIcon className="absolute top-2 right-2 w-5 h-5 text-white" />
                        )}
                        <span className={`font-medium ${formData.type === 'feedback' ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                          Feedback
                        </span>
                      </label>
                      <label className={`relative px-4 py-3 rounded-xl cursor-pointer text-center transition-all border-2 ${
                        formData.type === 'feature'
                          ? 'border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                          : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 hover:border-purple-300'
                      }`}>
                        <input
                          type="radio"
                          name="type"
                          value="feature"
                          checked={formData.type === 'feature'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {formData.type === 'feature' && (
                          <CheckCircleSolidIcon className="absolute top-2 right-2 w-5 h-5 text-white" />
                        )}
                        <span className={`font-medium ${formData.type === 'feature' ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                          Feature Request
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="glass-card w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="glass-card w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={formData.type === 'feature'
                        ? "Describe the feature you'd like to see..."
                        : "Share your thoughts, suggestions, or report issues..."
                      }
                      rows={4}
                      required
                      className="glass-card w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        Send Feedback
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
