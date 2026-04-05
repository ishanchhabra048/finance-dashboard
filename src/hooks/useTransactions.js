/**
 * useTransactions — Applies all filters, sorting, and grouping to transactions.
 * Returns both filtered flat list and grouped data structure.
 */
import { useMemo } from 'react';
import { useAppState } from './useAppState';
import { getDayLabel, getMonthYear } from '../utils/formatDate';

export const useTransactions = () => {
  const { state } = useAppState();
  const { transactions, filters, sortConfig, groupBy } = state;

  // ── Apply all filters ──
  const filtered = useMemo(() => {
    return transactions
      .filter((txn) => {
        // Text search
        const matchSearch =
          !filters.search ||
          txn.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          txn.category.toLowerCase().includes(filters.search.toLowerCase());

        // Type filter
        const matchType =
          filters.type === 'all' || txn.type === filters.type;

        // Single category filter
        const matchCategory =
          filters.category === 'all' || txn.category === filters.category;

        // Multi-category filter (if using advanced)
        const matchMultiCategory =
          !filters.categories ||
          filters.categories.length === 0 ||
          filters.categories.includes(txn.category);

        // Date range filter
        let matchDate = true;
        if (filters.dateRange?.from) {
          matchDate = matchDate && txn.date >= filters.dateRange.from;
        }
        if (filters.dateRange?.to) {
          matchDate = matchDate && txn.date <= filters.dateRange.to;
        }

        // Amount range filter
        let matchAmount = true;
        if (filters.amountRange?.min !== undefined && filters.amountRange?.min !== '') {
          matchAmount = matchAmount && txn.amount >= Number(filters.amountRange.min);
        }
        if (filters.amountRange?.max !== undefined && filters.amountRange?.max !== '') {
          matchAmount = matchAmount && txn.amount <= Number(filters.amountRange.max);
        }

        return matchSearch && matchType && matchCategory && matchMultiCategory && matchDate && matchAmount;
      })
      .sort((a, b) => {
        const dir = sortConfig.direction === 'asc' ? 1 : -1;
        if (sortConfig.key === 'date')
          return dir * (new Date(a.date) - new Date(b.date));
        if (sortConfig.key === 'amount')
          return dir * (a.amount - b.amount);
        if (sortConfig.key === 'category')
          return dir * a.category.localeCompare(b.category);
        if (sortConfig.key === 'description')
          return dir * a.description.localeCompare(b.description);
        return 0;
      });
  }, [transactions, filters, sortConfig]);

  // ── Group transactions ──
  const grouped = useMemo(() => {
    if (groupBy === 'none') return null;

    const groups = {};
    filtered.forEach((txn) => {
      let key;
      if (groupBy === 'day') key = getDayLabel(txn.date);
      else if (groupBy === 'month') key = getMonthYear(txn.date);
      else if (groupBy === 'category') key = txn.category;
      else key = 'All';

      if (!groups[key]) groups[key] = [];
      groups[key].push(txn);
    });

    return groups;
  }, [filtered, groupBy]);

  // ── Active filter chips ──
  const activeFilters = useMemo(() => {
    const chips = [];
    if (filters.search) chips.push({ key: 'search', label: `Search: "${filters.search}"` });
    if (filters.type !== 'all') chips.push({ key: 'type', label: `Type: ${filters.type}` });
    if (filters.category !== 'all') chips.push({ key: 'category', label: `Category: ${filters.category}` });
    if (filters.dateRange?.from) chips.push({ key: 'dateFrom', label: `From: ${filters.dateRange.from}` });
    if (filters.dateRange?.to) chips.push({ key: 'dateTo', label: `To: ${filters.dateRange.to}` });
    if (filters.amountRange?.min) chips.push({ key: 'amountMin', label: `Min: ₹${filters.amountRange.min}` });
    if (filters.amountRange?.max) chips.push({ key: 'amountMax', label: `Max: ₹${filters.amountRange.max}` });
    if (filters.categories?.length > 0) {
      chips.push({ key: 'multiCat', label: `Categories: ${filters.categories.join(', ')}` });
    }
    return chips;
  }, [filters]);

  return { filtered, grouped, activeFilters, total: filtered.length };
};
