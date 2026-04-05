/**
 * Format ISO date string for display.
 * @param {string} dateStr — ISO date e.g. "2025-03-20"
 * @returns {string} e.g. "20 Mar, 2025"
 */
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Get month-year label from ISO date string.
 * @param {string} dateStr — ISO date
 * @returns {string} e.g. "Mar 2025"
 */
export const getMonthYear = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Get day label for grouping
 * @param {string} dateStr
 * @returns {string} e.g. "20 Mar 2025"
 */
export const getDayLabel = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
