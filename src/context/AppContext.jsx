/**
 * Global application context provider.
 * Wraps the entire app and provides state + dispatch via React Context.
 * Integrates with localStorage for persistence and mock API for initial load.
 */
import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { appReducer, initialState } from './appReducer';
import { fetchTransactions } from '../services/transactionService';
import { saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'finance_dashboard_transactions';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ── Load transactions on mount via mock API ──
  useEffect(() => {
    const load = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await fetchTransactions();
        dispatch({ type: 'LOAD_TRANSACTIONS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load transactions.' });
      }
    };
    load();
  }, []);

  // ── Persist transactions to localStorage on every change ──
  useEffect(() => {
    if (state.transactions.length > 0) {
      saveToStorage(STORAGE_KEY, state.transactions);
    }
  }, [state.transactions]);

  // Memoized dispatch wrapper for convenience
  const contextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
