/**
 * TransactionTable — Full transactions table with header.
 * Supports grouping (by day, month, category) with sticky headers.
 * Empty state when no transactions match filters.
 */
import React from 'react';
import TransactionRow from './TransactionRow';
import EmptyState from '../common/EmptyState';
import { useTransactions } from '../../hooks/useTransactions';
import { useAppState } from '../../hooks/useAppState';
import { ArrowUpDown } from 'lucide-react';

const sortableColumns = [
  { key: 'date', label: 'DATE' },
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'category', label: 'CATEGORY', hideOnMobile: true },
  { key: 'type', label: 'TYPE', hideOnSmall: true },
  { key: 'amount', label: 'AMOUNT' },
];

const TransactionTable = () => {
  const { state, dispatch } = useAppState();
  const { filtered, grouped, total } = useTransactions();
  const { sortConfig, groupBy, role } = state;
  const isAdmin = role === 'admin';

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc';
    dispatch({ type: 'SET_SORT', payload: { key, direction } });
  };

  const openAddModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: { modal: 'add' } });
  };

  // If no transactions, show empty state
  if (total === 0) {
    return (
      <EmptyState
        message="No transactions match your filters. Try adjusting your search or filters."
        actionLabel="+ Add Transaction"
        onAction={openAddModal}
        showAction={isAdmin}
      />
    );
  }

  // Render table header
  const renderHeader = () => (
    <thead>
      <tr className="bg-bg-elevated">
        {sortableColumns.map((col) => (
          <th
            key={col.key}
            onClick={() => handleSort(col.key)}
            className={`py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-widest text-left cursor-pointer hover:text-text-primary transition-colors select-none
              ${col.key === 'amount' ? 'text-right' : ''}
              ${col.hideOnMobile ? 'hidden md:table-cell' : ''}
              ${col.hideOnSmall ? 'hidden sm:table-cell' : ''}
            `}
          >
            <div className={`flex items-center gap-1 ${col.key === 'amount' ? 'justify-end' : ''}`}>
              {col.label}
              {sortConfig.key === col.key && (
                <ArrowUpDown size={12} className="text-accent-primary" />
              )}
            </div>
          </th>
        ))}
        {/* Actions column */}
        <th className="py-3 px-4 w-20" />
      </tr>
    </thead>
  );

  // Grouped rendering
  if (grouped && groupBy !== 'none') {
    return (
      <div className="overflow-x-auto rounded-card border border-bg-border">
        {Object.entries(grouped).map(([groupLabel, txns]) => (
          <div key={groupLabel}>
            {/* Group header */}
            <div className="sticky top-0 bg-bg-base/90 backdrop-blur-sm px-4 py-2 border-b border-bg-border">
              <h4 className="text-sm font-semibold text-accent-primary">{groupLabel}</h4>
              <span className="text-xs text-text-muted">{txns.length} transactions</span>
            </div>
            <table className="w-full">
              {renderHeader()}
              <tbody>
                {txns.map((txn) => (
                  <TransactionRow key={txn.id} transaction={txn} />
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }

  // Flat rendering
  return (
    <div className="overflow-x-auto rounded-card border border-bg-border">
      <table className="w-full">
        {renderHeader()}
        <tbody>
          {filtered.map((txn, index) => (
            <TransactionRow key={txn.id} transaction={txn} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
