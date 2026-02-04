import { useState } from 'react';
import { InformationCircleIcon, XMarkIcon, TrashIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useBaby } from '../context/BabyContext';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/errorMessages';
import Button from './Button';

const PrivacyNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const { deleteAllUserData, babies } = useBaby();
  const { user, signOut } = useAuth();

  const handleDeleteAllData = async () => {
    setIsDeleting(true);
    setDeleteError('');
    try {
      await deleteAllUserData();
      await signOut();
      setShowDeleteConfirm(false);
      setIsOpen(false);
    } catch (err) {
      setDeleteError(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="glass-card border border-white/10 p-2 rounded-lg hover:scale-105 transition-transform duration-200"
        aria-label="Data privacy information"
        title="Data Privacy"
      >
        <InformationCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !showDeleteConfirm && setIsOpen(false)}
          />
          <div className="relative glass-card border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {!showDeleteConfirm ? (
              <>
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
                    <strong className="text-gray-900 dark:text-gray-100">Your data is securely stored.</strong>
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span>Data is stored securely in the cloud linked to your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span>Only you can access your data through your authenticated account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span>Your data syncs across all your devices when signed in</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span>We do not share, sell, or use your data for advertising</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span>You can delete all your data at any time</span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong>What we store:</strong> Baby profiles, vaccine records, milestones, growth records, and uploaded medical documents.
                    </p>
                  </div>

                  {user && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Want to remove all your data? This action cannot be undone.
                      </p>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={TrashIcon}
                        onClick={() => setShowDeleteConfirm(true)}
                        fullWidth
                      >
                        Delete All My Data
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Confirm Deletion
                  </h3>
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="text-sm">
                    Are you sure you want to delete <strong>all your data</strong>? This will permanently remove:
                  </p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• {babies.length} baby profile{babies.length !== 1 ? 's' : ''}</li>
                    <li>• All vaccine records</li>
                    <li>• All milestones</li>
                    <li>• All growth records</li>
                    <li>• All uploaded medical documents</li>
                  </ul>
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    This action cannot be undone!
                  </p>

                  {deleteError && (
                    <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                      {deleteError}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                      fullWidth
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={isDeleting ? ArrowPathIcon : TrashIcon}
                      onClick={handleDeleteAllData}
                      fullWidth
                      disabled={isDeleting}
                      className={isDeleting ? '[&>svg]:animate-spin' : ''}
                    >
                      {isDeleting ? 'Deleting...' : 'Yes, Delete All'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyNotice;
