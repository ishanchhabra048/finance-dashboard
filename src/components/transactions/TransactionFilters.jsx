/**
 * TransactionFilters — Search, filter, sort bar with advanced filtering.
 * Includes: text search, type filter, category filter, date range, amount range,
 * group-by selector, export buttons, and active filter chips.
 */
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppState } from '../../hooks/useAppState';
import { useTransactions } from '../../hooks/useTransactions';
import { categories } from '../../data/categories';
import { exportCSV, exportJSON } from '../../utils/exportData';
import Button from '../common/Button';
import Select from '../common/Select';

const TransactionFilters = () => {
  const { state, dispatch } = useAppState();
  const { filtered, activeFilters } = useTransactions();
  const { filters, groupBy } = state;
  const [showAdvanced, setShowAdvanced] = useState(false);

  const setFilter = (payload) => {
    dispatch({ type: 'SET_FILTER', payload });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const removeFilter = (key) => {
    switch (key) {
      case 'search': setFilter({ search: '' }); break;
      case 'type': setFilter({ type: 'all' }); break;
      case 'category': setFilter({ category: 'all' }); break;
      case 'dateFrom': setFilter({ dateRange: { ...filters.dateRange, from: '' } }); break;
      case 'dateTo': setFilter({ dateRange: { ...filters.dateRange, to: '' } }); break;
      case 'amountMin': setFilter({ amountRange: { ...filters.amountRange, min: '' } }); break;
      case 'amountMax': setFilter({ amountRange: { ...filters.amountRange, max: '' } }); break;
      case 'multiCat': setFilter({ categories: [] }); break;
      default: break;
    }
  };

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((c) => ({ value: c.label, label: c.label })),
  ];

  const groupOptions = [
    { value: 'none', label: 'No Grouping' },
    { value: 'day', label: 'Group by Day' },
    { value: 'month', label: 'Group by Month' },
    { value: 'category', label: 'Group by Category' },
  ];

  return (
    <div className="space-y-3 mb-6">
      {/* Primary filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className="w-full bg-bg-elevated border border-bg-border rounded-btn pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
          />
        </div>

        {/* Type filter */}
        <Select
          value={filters.type}
          onChange={(e) => setFilter({ type: e.target.value })}
          options={typeOptions}
          className="w-full sm:w-40"
        />

        {/* Category filter */}
        <Select
          value={filters.category}
          onChange={(e) => setFilter({ category: e.target.value })}
          options={categoryOptions}
          className="w-full sm:w-44"
        />

        {/* Advanced toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-btn border border-bg-border text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={14} strokeWidth={1.5} />
          <span className="hidden sm:inline">Advanced</span>
          {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Advanced filters (collapsible) */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 bg-bg-surface rounded-card border border-bg-border animate-fade-in">
          {/* Date From */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-secondary">From Date</label>
            <input
              type="date"
              value={filters.dateRange?.from || ''}
              onChange={(e) =>
                setFilter({
                  dateRange: { ...filters.dateRange, from: e.target.value, to: filters.dateRange?.to || '' },
                })
              }
              className="bg-bg-elevated border border-bg-border rounded-btn px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>

          {/* Date To */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-secondary">To Date</label>
            <input
              type="date"
              value={filters.dateRange?.to || ''}
              onChange={(e) =>
                setFilter({
                  dateRange: { ...filters.dateRange, to: e.target.value, from: filters.dateRange?.from || '' },
                })
              }
              className="bg-bg-elevated border border-bg-border rounded-btn px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>

          {/* Amount Min */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-secondary">Min Amount (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={filters.amountRange?.min || ''}
              onChange={(e) =>
                setFilter({
                  amountRange: { ...filters.amountRange, min: e.target.value, max: filters.amountRange?.max || '' },
                })
              }
              className="bg-bg-elevated border border-bg-border rounded-btn px-3 py-2 text-sm text-text-primary font-number placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>

          {/* Amount Max */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-secondary">Max Amount (₹)</label>
            <input
              type="number"
              placeholder="100000"
              value={filters.amountRange?.max || ''}
              onChange={(e) =>
                setFilter({
                  amountRange: { ...filters.amountRange, max: e.target.value, min: filters.amountRange?.min || '' },
                })
              }
              className="bg-bg-elevated border border-bg-border rounded-btn px-3 py-2 text-sm text-text-primary font-number placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>

          {/* Group By */}
          <Select
            label="Group By"
            value={groupBy}
            onChange={(e) => dispatch({ type: 'SET_GROUP_BY', payload: e.target.value })}
            options={groupOptions}
          />
        </div>
      )}

      {/* Bottom bar: Active filter chips + Export + Reset */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Active filter chips */}
        {activeFilters.map((chip) => (
          <span
            key={chip.key}
            className="filter-chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-primary-dim text-accent-primary text-xs font-medium"
          >
            {chip.label}
            <button
              onClick={() => removeFilter(chip.key)}
              className="hover:text-text-primary transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          </span>
        ))}

        {activeFilters.length > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-text-muted hover:text-accent-expense transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Export buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Download}
            onClick={() => exportCSV(filtered)}
          >
            CSV
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Download}
            onClick={() => exportJSON(filtered)}
          >
            JSON
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
