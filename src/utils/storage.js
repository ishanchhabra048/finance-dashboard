/**
 * LocalStorage persistence helpers.
 * Key: "finance_dashboard_transactions"
 */

const STORAGE_KEY = 'finance_dashboard_transactions';

/**
 * Save data to localStorage.
 */
export const saveToStorage = (key = STORAGE_KEY, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
};

/**
 * Load data from localStorage.
 * Returns null if nothing stored or on error.
 */
export const loadFromStorage = (key = STORAGE_KEY) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return null;
  }
};

/**
 * Clear stored data.
 */
export const clearStorage = (key = STORAGE_KEY) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to clear localStorage:', e);
  }
};
