/**
 * Insight computation functions.
 * Operates on the full transactions array to derive dashboard insights.
 */
import { getMonthYear } from './formatDate';

/**
 * Calculate total income, expenses, and balance.
 */
export const calculateTotals = (transactions) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

/**
 * Get spending breakdown by category (expenses only).
 * Returns array sorted by amount descending.
 */
export const getSpendingByCategory = (transactions) => {
  const map = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * Get the highest spending category.
 */
export const getHighestSpendingCategory = (transactions) => {
  const breakdown = getSpendingByCategory(transactions);
  return breakdown.length > 0 ? breakdown[0] : null;
};

/**
 * Monthly income vs expense comparison.
 * Returns array: [{ month, income, expenses }]
 */
export const getMonthlyComparison = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    const key = getMonthYear(t.date);
    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });

  // Sort chronologically
  return Object.values(map).sort(
    (a, b) => new Date('01 ' + a.month) - new Date('01 ' + b.month)
  );
};

/**
 * Get balance trend over time (cumulative running balance by month).
 */
export const getBalanceTrend = (transactions) => {
  const monthly = getMonthlyComparison(transactions);
  let running = 0;
  return monthly.map((m) => {
    running += m.income - m.expenses;
    return { month: m.month, balance: running, income: m.income, expenses: m.expenses };
  });
};

/**
 * Generate key observations / insights.
 */
export const generateObservations = (transactions) => {
  const observations = [];
  const totals = calculateTotals(transactions);
  const highest = getHighestSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);

  if (highest) {
    const pct = ((highest.amount / totals.expenses) * 100).toFixed(1);
    observations.push({
      id: 'highest-category',
      title: 'Top Spending Category',
      description: `${highest.category} accounts for ${pct}% of total expenses.`,
      value: highest.amount,
      type: 'warning',
    });
  }

  // Savings rate
  if (totals.income > 0) {
    const savingsRate = (((totals.income - totals.expenses) / totals.income) * 100).toFixed(1);
    observations.push({
      id: 'savings-rate',
      title: 'Savings Rate',
      description: `You're saving ${savingsRate}% of your income.`,
      value: parseFloat(savingsRate),
      type: savingsRate >= 20 ? 'positive' : 'warning',
    });
  }

  // Month-over-month change
  if (monthly.length >= 2) {
    const latest = monthly[monthly.length - 1];
    const previous = monthly[monthly.length - 2];
    const change = latest.expenses - previous.expenses;
    const changePct = previous.expenses > 0
      ? ((change / previous.expenses) * 100).toFixed(1)
      : 0;
    observations.push({
      id: 'monthly-change',
      title: 'Monthly Expense Change',
      description: change > 0
        ? `Expenses increased by ${changePct}% compared to last month.`
        : `Expenses decreased by ${Math.abs(changePct)}% compared to last month.`,
      value: Math.abs(change),
      type: change > 0 ? 'negative' : 'positive',
    });
  }

  // Average transaction
  const avgExpense = totals.expenses / Math.max(transactions.filter(t => t.type === 'expense').length, 1);
  observations.push({
    id: 'avg-expense',
    title: 'Average Expense',
    description: `Your average expense per transaction is ₹${avgExpense.toFixed(0)}.`,
    value: avgExpense,
    type: 'info',
  });

  return observations;
};
