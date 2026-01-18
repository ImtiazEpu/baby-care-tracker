/**
 * Parse a date string (YYYY-MM-DD) as local timezone date at midnight
 * This avoids UTC parsing issues that can shift dates by a day
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {Date} Date object set to local midnight
 */
const parseLocalDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // months are 0-indexed
};

/**
 * Get today's date at local midnight (for consistent date comparisons)
 * @returns {Date} Today's date at midnight local time
 */
const getTodayLocal = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

/**
 * Calculate exact age of baby
 * @param {string} dob - Date of birth in YYYY-MM-DD format
 * @returns {Object} Age breakdown with years, months, days
 */
export const calculateAge = (dob) => {
  if (!dob) return null;

  const birthDate = parseLocalDate(dob);
  const today = getTodayLocal();

  if (isNaN(birthDate.getTime()) || birthDate > today) {
    return null;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  // Calculate total months
  let totalMonths = (today.getFullYear() - birthDate.getFullYear()) * 12;
  totalMonths += today.getMonth() - birthDate.getMonth();

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    formatted: formatAge(years, months, days)
  };
};

/**
 * Format age in readable format
 */
const formatAge = (years, months, days) => {
  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  }
  if (days > 0 || parts.length === 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }

  return parts.join(', ');
};

/**
 * Calculate due date for a vaccine using proper date arithmetic
 * @param {string} dob - Date of birth
 * @param {number} daysAfterBirth - Days after birth when vaccine is due
 * @returns {string} Due date in readable format
 */
export const calculateVaccineDueDate = (dob, daysAfterBirth) => {
  if (!dob) return null;

  const birthDate = parseLocalDate(dob);
  // Use setDate for proper date arithmetic (handles month/year boundaries correctly)
  const dueDate = new Date(birthDate);
  dueDate.setDate(dueDate.getDate() + daysAfterBirth);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[dueDate.getMonth()]} ${dueDate.getDate()}, ${dueDate.getFullYear()}`;
};

/**
 * Get days until/since vaccine due date
 * @param {string} dob - Date of birth
 * @param {number} daysAfterBirth - Days after birth when vaccine is due
 * @returns {number} Negative if overdue, positive if upcoming, 0 if today
 */
export const getDaysUntilVaccine = (dob, daysAfterBirth) => {
  if (!dob) return null;

  const birthDate = parseLocalDate(dob);
  const dueDate = new Date(birthDate);
  dueDate.setDate(dueDate.getDate() + daysAfterBirth);

  const today = getTodayLocal();

  // Calculate difference in days
  const diffTime = dueDate.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};
