/**
 * Mock API service layer.
 * Simulates real API calls with artificial delay for loading states.
 */
import { mockTransactions } from '../data/mockTransactions';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'finance_dashboard_transactions';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Fetch all transactions.
 * Checks localStorage first, falls back to mock data.
 */
export const fetchTransactions = async () => {
  await delay(600);
  const stored = loadFromStorage(STORAGE_KEY);
  const data = stored ?? mockTransactions;
  // Ensure localStorage has a copy
  if (!stored) saveToStorage(STORAGE_KEY, data);
  return { data, status: 200 };
};

/**
 * Add a new transaction.
 */
export const addTransaction = async (txn) => {
  await delay(400);
  const newTxn = { ...txn, id: `txn_${Date.now()}` };
  return { data: newTxn, status: 201 };
};

/**
 * Update an existing transaction by id.
 */
export const updateTransaction = async (id, updates) => {
  await delay(400);
  return { data: { id, ...updates }, status: 200 };
};

/**
 * Delete a transaction by id.
 */
export const deleteTransaction = async (id) => {
  await delay(300);
  return { data: { id }, status: 200 };
};
