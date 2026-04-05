/**
 * 50 mock transactions spread across 6 months (Oct 2024 — Mar 2025).
 * Mix: ~20% income, ~80% expenses across all 10 categories.
 * Amounts range from ₹120 to ₹75,000.
 */
export const mockTransactions = [
  // ── March 2025 ──
  { id: 'txn_001', date: '2025-03-20', description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 65000.00 },
  { id: 'txn_002', date: '2025-03-18', description: 'Swiggy Order',          category: 'Food',          type: 'expense', amount: 349.00 },
  { id: 'txn_003', date: '2025-03-16', description: 'Uber Ride to Office',   category: 'Transport',     type: 'expense', amount: 245.00 },
  { id: 'txn_004', date: '2025-03-14', description: 'Netflix Subscription',  category: 'Entertainment', type: 'expense', amount: 649.00 },
  { id: 'txn_005', date: '2025-03-12', description: 'Pharmacy — Vitamins',   category: 'Health',        type: 'expense', amount: 890.00 },
  { id: 'txn_006', date: '2025-03-10', description: 'Amazon — Headphones',   category: 'Shopping',      type: 'expense', amount: 2499.00 },
  { id: 'txn_007', date: '2025-03-08', description: 'Electricity Bill',      category: 'Utilities',     type: 'expense', amount: 1820.00 },
  { id: 'txn_008', date: '2025-03-05', description: 'Freelance — Logo Design', category: 'Freelance',   type: 'income',  amount: 12000.00 },
  { id: 'txn_009', date: '2025-03-03', description: 'Grocery Store',         category: 'Food',          type: 'expense', amount: 1450.00 },

  // ── February 2025 ──
  { id: 'txn_010', date: '2025-02-25', description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 65000.00 },
  { id: 'txn_011', date: '2025-02-22', description: 'Zomato Order',          category: 'Food',          type: 'expense', amount: 520.00 },
  { id: 'txn_012', date: '2025-02-20', description: 'Metro Card Recharge',   category: 'Transport',     type: 'expense', amount: 500.00 },
  { id: 'txn_013', date: '2025-02-18', description: 'Movie Tickets',         category: 'Entertainment', type: 'expense', amount: 750.00 },
  { id: 'txn_014', date: '2025-02-15', description: 'Gym Membership',        category: 'Health',        type: 'expense', amount: 2200.00 },
  { id: 'txn_015', date: '2025-02-13', description: 'Flipkart — Shoes',      category: 'Shopping',      type: 'expense', amount: 3499.00 },
  { id: 'txn_016', date: '2025-02-10', description: 'Internet Bill',         category: 'Utilities',     type: 'expense', amount: 999.00 },
  { id: 'txn_017', date: '2025-02-08', description: 'Dividend Income',       category: 'Investment',    type: 'income',  amount: 4500.00 },
  { id: 'txn_018', date: '2025-02-05', description: 'Vegetable Market',      category: 'Food',          type: 'expense', amount: 680.00 },

  // ── January 2025 ──
  { id: 'txn_019', date: '2025-01-28', description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 65000.00 },
  { id: 'txn_020', date: '2025-01-25', description: 'Pizza Hut Dinner',      category: 'Food',          type: 'expense', amount: 1120.00 },
  { id: 'txn_021', date: '2025-01-22', description: 'Fuel Refill',           category: 'Transport',     type: 'expense', amount: 3200.00 },
  { id: 'txn_022', date: '2025-01-20', description: 'Spotify Premium',       category: 'Entertainment', type: 'expense', amount: 119.00 },
  { id: 'txn_023', date: '2025-01-18', description: 'Doctor Visit',          category: 'Health',        type: 'expense', amount: 1500.00 },
  { id: 'txn_024', date: '2025-01-15', description: 'Myntra — Jacket',       category: 'Shopping',      type: 'expense', amount: 2899.00 },
  { id: 'txn_025', date: '2025-01-12', description: 'Gas Bill',              category: 'Utilities',     type: 'expense', amount: 450.00 },
  { id: 'txn_026', date: '2025-01-10', description: 'Freelance — Website',   category: 'Freelance',     type: 'income',  amount: 25000.00 },
  { id: 'txn_027', date: '2025-01-05', description: 'Misc Expense',          category: 'Other',         type: 'expense', amount: 750.00 },

  // ── December 2024 ──
  { id: 'txn_028', date: '2024-12-28', description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 62000.00 },
  { id: 'txn_029', date: '2024-12-25', description: 'Christmas Party Food',  category: 'Food',          type: 'expense', amount: 3500.00 },
  { id: 'txn_030', date: '2024-12-22', description: 'Cab to Airport',        category: 'Transport',     type: 'expense', amount: 1800.00 },
  { id: 'txn_031', date: '2024-12-20', description: 'BookMyShow Tickets',    category: 'Entertainment', type: 'expense', amount: 1200.00 },
  { id: 'txn_032', date: '2024-12-18', description: 'Dental Checkup',        category: 'Health',        type: 'expense', amount: 2500.00 },
  { id: 'txn_033', date: '2024-12-15', description: 'Amazon — Winter Wear',  category: 'Shopping',      type: 'expense', amount: 4200.00 },
  { id: 'txn_034', date: '2024-12-10', description: 'Water Purifier Service',category: 'Utilities',     type: 'expense', amount: 1200.00 },
  { id: 'txn_035', date: '2024-12-05', description: 'Mutual Fund Returns',   category: 'Investment',    type: 'income',  amount: 8500.00 },
  { id: 'txn_036', date: '2024-12-02', description: 'Street Food',           category: 'Food',          type: 'expense', amount: 280.00 },

  // ── November 2024 ──
  { id: 'txn_037', date: '2024-11-28', description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 62000.00 },
  { id: 'txn_038', date: '2024-11-25', description: 'Dominos Pizza',         category: 'Food',          type: 'expense', amount: 599.00 },
  { id: 'txn_039', date: '2024-11-22', description: 'Rapido Bike Ride',      category: 'Transport',     type: 'expense', amount: 120.00 },
  { id: 'txn_040', date: '2024-11-20', description: 'Gaming Subscription',   category: 'Entertainment', type: 'expense', amount: 499.00 },
  { id: 'txn_041', date: '2024-11-18', description: 'Blood Test',            category: 'Health',        type: 'expense', amount: 950.00 },
  { id: 'txn_042', date: '2024-11-15', description: 'Electronics Store',     category: 'Shopping',      type: 'expense', amount: 7500.00 },
  { id: 'txn_043', date: '2024-11-10', description: 'Phone Bill',            category: 'Utilities',     type: 'expense', amount: 599.00 },
  { id: 'txn_044', date: '2024-11-05', description: 'Bakery Purchase',       category: 'Food',          type: 'expense', amount: 320.00 },

  // ── October 2024 ──
  { id: 'txn_045', date: '2024-10-28', description: 'Monthly Salary',        category: 'Salary',        type: 'income',  amount: 62000.00 },
  { id: 'txn_046', date: '2024-10-25', description: 'Restaurant Dinner',     category: 'Food',          type: 'expense', amount: 1850.00 },
  { id: 'txn_047', date: '2024-10-20', description: 'Train Tickets',         category: 'Transport',     type: 'expense', amount: 2300.00 },
  { id: 'txn_048', date: '2024-10-15', description: 'Diwali Shopping',       category: 'Shopping',      type: 'expense', amount: 15000.00 },
  { id: 'txn_049', date: '2024-10-10', description: 'Freelance — App UI',    category: 'Freelance',     type: 'income',  amount: 18000.00 },
  { id: 'txn_050', date: '2024-10-05', description: 'Electricity Bill',      category: 'Utilities',     type: 'expense', amount: 1650.00 },
];
