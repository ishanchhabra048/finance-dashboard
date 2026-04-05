/**
 * TransactionRow — Single table row for a transaction.
 * Shows date, description, category badge, type badge, and amount.
 * Admin mode: shows edit and delete action icons.
 */
import React from 'react';
import { Pencil, Trash2, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { getCategoryColor } from '../../data/categories';
import { useAppState } from '../../hooks/useAppState';

const TransactionRow = ({ transaction }) => {
  const { state, dispatch } = useAppState();
  const isAdmin = state.role === 'admin';
  const isIncome = transaction.type === 'income';

  const handleEdit = () => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { modal: 'edit', transaction },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id });
    }
  };

  return (
    <tr className="group border-b border-bg-border/50 hover:bg-bg-elevated/50 transition-colors duration-100">
      {/* Date */}
      <td className="py-3 px-4 text-sm font-number text-text-secondary whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>

      {/* Description */}
      <td className="py-3 px-4 text-sm text-text-primary">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${getCategoryColor(transaction.category)}18` }}
          >
            {isIncome ? (
              <ArrowDownLeft size={16} className="text-accent-income" strokeWidth={1.5} />
            ) : (
              <ArrowUpRight size={16} className="text-accent-expense" strokeWidth={1.5} />
            )}
          </div>
          <div>
            <p className="font-medium">{transaction.description}</p>
            {transaction.note && (
              <p className="text-xs text-text-muted mt-0.5">{transaction.note}</p>
            )}
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="py-3 px-4 hidden md:table-cell">
        <Badge color={getCategoryColor(transaction.category)}>
          {transaction.category}
        </Badge>
      </td>

      {/* Type */}
      <td className="py-3 px-4 hidden sm:table-cell">
        <Badge variant={transaction.type}>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </Badge>
      </td>

      {/* Amount */}
      <td className={`py-3 px-4 text-sm font-number text-right font-medium whitespace-nowrap ${
        isIncome ? 'text-accent-income' : 'text-accent-expense'
      }`}>
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </td>

      {/* Admin Actions */}
      <td className="py-3 px-4 text-right">
        {isAdmin && (
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-lg hover:bg-bg-surface text-text-muted hover:text-accent-primary transition-colors cursor-pointer"
              aria-label="Edit transaction"
            >
              <Pencil size={14} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-bg-surface text-text-muted hover:text-accent-expense transition-colors cursor-pointer"
              aria-label="Delete transaction"
            >
              <Trash2 size={14} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;
