import { useState } from 'react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PrivacyNotice = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="glass-card p-2 rounded-lg hover:scale-105 transition-transform duration-200"
        aria-label="Data privacy information"
        title="Data Privacy"
      >
        <InformationCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative glass-card rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                <InformationCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Data Privacy Notice
              </h3>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Your data stays with you.</strong>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>All data is stored locally on your device using browser storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>No data is sent to any external servers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>No account or registration required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Clearing browser data will remove all stored information</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                This app is designed with privacy in mind. Your baby's information never leaves your device.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyNotice;
