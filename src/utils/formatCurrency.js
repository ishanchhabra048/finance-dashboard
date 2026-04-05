/**
 * Format a number as Indian Rupee currency string.
 * Uses DM Mono in the UI via the font-number class.
 * @param {number} amount — The numeric value
 * @param {string} currency — Currency symbol (default ₹)
 * @returns {string} Formatted currency string e.g. "₹1,45,000.00"
 */
export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Compact format for chart axes (e.g. "₹65K")
 */
export const formatCompact = (amount, currency = '₹') => {
  if (amount >= 100000) return `${currency}${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `${currency}${(amount / 1000).toFixed(0)}K`;
  return `${currency}${amount}`;
};
