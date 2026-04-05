/**
 * TransactionsPage — Route: /transactions
 * Shows filters bar, transaction table, and add/edit modal.
 * Admin: can add, edit, delete transactions.
 * Viewer: read-only.
 */
import React from 'react';
import { PlusCircle } from 'lucide-react';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionModal from '../components/transactions/TransactionModal';
import Button from '../components/common/Button';
import { useAppState } from '../hooks/useAppState';
import { useTransactions } from '../hooks/useTransactions';

const TransactionsPage = () => {
  const { state, dispatch } = useAppState();
  const { total } = useTransactions();
  const isAdmin = state.role === 'admin';

  const openAddModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: { modal: 'add' } });
  };

  // Loading state
  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Transactions</h1>
          <p className="text-sm text-text-secondary mt-1">
            <span className="font-number">{total}</span> transactions found
          </p>
        </div>

        {/* Add Transaction Button (Admin only) */}
        {isAdmin && (
          <Button onClick={openAddModal} icon={PlusCircle}>
            Add Transaction
          </Button>
        )}
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <TransactionTable />

      {/* Modal (Add/Edit) */}
      <TransactionModal />
    </div>
  );
};

export default TransactionsPage;
