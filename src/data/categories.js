/**
 * Category definitions with colors and icons.
 * Colors follow the chart palette from the design system.
 */
export const categories = [
  { id: 'food',          label: 'Food',          color: '#00D4AA', icon: 'ShoppingCart' },
  { id: 'transport',     label: 'Transport',     color: '#7B6FF0', icon: 'Car' },
  { id: 'entertainment', label: 'Entertainment', color: '#F5A623', icon: 'Film' },
  { id: 'health',        label: 'Health',        color: '#FF5C6A', icon: 'Heart' },
  { id: 'shopping',      label: 'Shopping',      color: '#38BDF8', icon: 'ShoppingBag' },
  { id: 'utilities',     label: 'Utilities',     color: '#A78BFA', icon: 'Zap' },
  { id: 'salary',        label: 'Salary',        color: '#00D4AA', icon: 'Briefcase' },
  { id: 'freelance',     label: 'Freelance',     color: '#7B6FF0', icon: 'Laptop' },
  { id: 'investment',    label: 'Investment',     color: '#38BDF8', icon: 'TrendingUp' },
  { id: 'other',         label: 'Other',          color: '#8892A4', icon: 'MoreHorizontal' },
];

/**
 * Chart-friendly palette (ordered)
 */
export const chartColors = [
  '#00D4AA', '#7B6FF0', '#F5A623', '#FF5C6A', '#38BDF8', '#A78BFA',
];

/**
 * Lookup helpers
 */
export const getCategoryColor = (categoryLabel) => {
  const cat = categories.find(
    (c) => c.label.toLowerCase() === categoryLabel.toLowerCase()
  );
  return cat?.color ?? '#8892A4';
};

export const getCategoryById = (id) =>
  categories.find((c) => c.id === id) ?? null;
