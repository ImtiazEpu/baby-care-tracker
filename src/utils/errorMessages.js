/**
 * Convert Firebase and other technical errors to user-friendly messages
 */

const ERROR_MESSAGES = {
  // Auth errors
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'This email is already registered. Try signing in instead.',
  'auth/weak-password': 'Password is too weak. Please use a stronger password.',
  'auth/invalid-action-code': 'This sign-in link has expired or already been used. Please request a new one.',
  'auth/expired-action-code': 'This sign-in link has expired. Please request a new one.',
  'auth/invalid-credential': 'Invalid credentials. Please try again.',
  'auth/operation-not-allowed': 'This sign-in method is not available. Please try another method.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
  'auth/popup-blocked': 'Sign-in popup was blocked. Please allow popups and try again.',
  'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method.',
  'auth/network-request-failed': 'Network error. Please check your internet connection and try again.',
  'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
  'auth/quota-exceeded': 'Service temporarily unavailable. Please try again later or use a different sign-in method.',
  'auth/requires-recent-login': 'Please sign in again to complete this action.',
  'auth/invalid-api-key': 'Service configuration error. Please contact support.',
  'auth/app-deleted': 'Service unavailable. Please try again later.',
  'auth/invalid-user-token': 'Your session has expired. Please sign in again.',
  'auth/user-token-expired': 'Your session has expired. Please sign in again.',
  'auth/web-storage-unsupported': 'Your browser does not support required features. Please try a different browser.',

  // Firestore errors
  'permission-denied': 'You do not have permission to perform this action.',
  'unavailable': 'Service temporarily unavailable. Please try again.',
  'not-found': 'The requested data was not found.',
  'already-exists': 'This data already exists.',
  'resource-exhausted': 'Service limit reached. Please try again later.',
  'failed-precondition': 'Operation cannot be completed. Please try again.',
  'aborted': 'Operation was interrupted. Please try again.',
  'out-of-range': 'Invalid data provided.',
  'unimplemented': 'This feature is not available.',
  'internal': 'An unexpected error occurred. Please try again.',
  'data-loss': 'Data error occurred. Please try again.',
  'unauthenticated': 'Please sign in to continue.',

  // Storage errors
  'storage/unauthorized': 'You do not have permission to access this file.',
  'storage/canceled': 'Upload was cancelled.',
  'storage/unknown': 'An error occurred while uploading. Please try again.',
  'storage/object-not-found': 'File not found.',
  'storage/quota-exceeded': 'Storage limit reached. Please delete some files and try again.',
  'storage/retry-limit-exceeded': 'Upload failed. Please try again.',
  'storage/invalid-checksum': 'File upload error. Please try again.',
  'storage/server-file-wrong-size': 'File upload error. Please try again.',
};

const SUCCESS_MESSAGES = {
  'email-sent': 'Check your email for the sign-in link.',
  'signed-out': 'You have been signed out successfully.',
  'data-saved': 'Your changes have been saved.',
  'data-deleted': 'Data has been deleted successfully.',
  'profile-updated': 'Profile updated successfully.',
};

/**
 * Get user-friendly error message from error object or code
 * @param {Error|string} error - Error object or error code
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  // Handle string error codes
  if (typeof error === 'string') {
    return ERROR_MESSAGES[error] || 'Something went wrong. Please try again.';
  }

  // Handle error objects
  if (error?.code) {
    return ERROR_MESSAGES[error.code] || 'Something went wrong. Please try again.';
  }

  // Handle error messages that contain Firebase references
  if (error?.message) {
    // Check if any known error code is in the message
    for (const [code, message] of Object.entries(ERROR_MESSAGES)) {
      if (error.message.includes(code)) {
        return message;
      }
    }

    // Check for common patterns and sanitize
    if (error.message.includes('Firebase') || error.message.includes('firebase')) {
      return 'Something went wrong. Please try again.';
    }

    // If it's a generic message without technical details, return it
    if (!error.message.includes('auth/') &&
        !error.message.includes('firestore') &&
        !error.message.includes('storage/')) {
      return error.message;
    }
  }

  return 'Something went wrong. Please try again.';
};

/**
 * Get user-friendly success message
 * @param {string} type - Success message type
 * @returns {string} User-friendly success message
 */
export const getSuccessMessage = (type) => {
  return SUCCESS_MESSAGES[type] || 'Operation completed successfully.';
};

/**
 * Check if error is a network/connectivity error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return error?.code === 'auth/network-request-failed' ||
         error?.code === 'unavailable' ||
         error?.message?.includes('network') ||
         error?.message?.includes('Network');
};

/**
 * Check if error requires re-authentication
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const requiresReauth = (error) => {
  return error?.code === 'auth/requires-recent-login' ||
         error?.code === 'auth/user-token-expired' ||
         error?.code === 'auth/invalid-user-token' ||
         error?.code === 'unauthenticated';
};
