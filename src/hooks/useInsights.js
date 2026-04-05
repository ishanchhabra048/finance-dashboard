/**
 * useInsights — Derives computed insights from the transaction state.
 */
import { useMemo } from 'react';
import { useAppState } from './useAppState';
import {
  calculateTotals,
  getSpendingByCategory,
  getHighestSpendingCategory,
  getMonthlyComparison,
  getBalanceTrend,
  generateObservations,
} from '../utils/calculateInsights';

export const useInsights = () => {
  const { state } = useAppState();
  const { transactions } = state;

  const totals = useMemo(() => calculateTotals(transactions), [transactions]);
  const spendingByCategory = useMemo(() => getSpendingByCategory(transactions), [transactions]);
  const highestCategory = useMemo(() => getHighestSpendingCategory(transactions), [transactions]);
  const monthlyComparison = useMemo(() => getMonthlyComparison(transactions), [transactions]);
  const balanceTrend = useMemo(() => getBalanceTrend(transactions), [transactions]);
  const observations = useMemo(() => generateObservations(transactions), [transactions]);

  return {
    totals,
    spendingByCategory,
    highestCategory,
    monthlyComparison,
    balanceTrend,
    observations,
  };
};
