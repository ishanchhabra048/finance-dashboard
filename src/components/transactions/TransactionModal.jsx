/**
 * TransactionModal — Add/Edit transaction form (Admin only).
 * Fields: description, amount, category, type, date, note.
 * Dark themed inputs, cancel (ghost) + save (primary) buttons.
 */
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { useAppState } from '../../hooks/useAppState';
import { categories } from '../../data/categories';
import { addTransaction, updateTransaction } from '../../services/transactionService';

const TransactionModal = () => {
  const { state, dispatch } = useAppState();
  const { activeModal, selectedTransaction } = state;
  const isEdit = activeModal === 'edit';
  const isOpen = activeModal === 'add' || activeModal === 'edit';

  // Form state
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  const [saving, setSaving] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (isEdit && selectedTransaction) {
      setForm({
        description: selectedTransaction.description,
        amount: String(selectedTransaction.amount),
        category: selectedTransaction.category,
        type: selectedTransaction.type,
        date: selectedTransaction.date,
        note: selectedTransaction.note || '',
      });
    } else if (activeModal === 'add') {
      setForm({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        note: '',
      });
    }
  }, [activeModal, selectedTransaction, isEdit]);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.date) return;

    setSaving(true);

    const txnData = {
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
      note: form.note,
    };

    try {
      if (isEdit && selectedTransaction) {
        const res = await updateTransaction(selectedTransaction.id, txnData);
        dispatch({
          type: 'EDIT_TRANSACTION',
          payload: { ...txnData, id: selectedTransaction.id },
        });
      } else {
        const res = await addTransaction(txnData);
        dispatch({ type: 'ADD_TRANSACTION', payload: res.data });
      }
      handleClose();
    } catch (err) {
      console.error('Failed to save transaction:', err);
    } finally {
      setSaving(false);
    }
  };

  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ];

  const categoryOptions = categories.map((c) => ({
    value: c.label,
    label: c.label,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Description */}
        <Input
          id="txn-description"
          label="Description"
          placeholder="e.g., Grocery Shopping"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />

        {/* Amount + Type row */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="txn-amount"
            label="Amount (₹)"
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            min="0"
            step="0.01"
            required
            className="font-number"
          />
          <Select
            id="txn-type"
            label="Type"
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
            options={typeOptions}
          />
        </div>

        {/* Category + Date row */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            id="txn-category"
            label="Category"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            options={categoryOptions}
          />
          <Input
            id="txn-date"
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
          />
        </div>

        {/* Note */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="txn-note" className="text-sm text-text-secondary">
            Note (optional)
          </label>
          <textarea
            id="txn-note"
            value={form.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="Add a note..."
            rows={2}
            className="bg-bg-elevated border border-bg-border rounded-btn px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
          />
        </div>

        {/* Button row */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionModal;
