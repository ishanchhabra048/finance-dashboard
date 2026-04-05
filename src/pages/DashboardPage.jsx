/**
 * DashboardPage — Route: /
 * Shows KPI summary cards (Balance, Income, Expenses),
 * Balance trend chart, and Spending donut chart.
 */
import React from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingDonut from '../components/dashboard/SpendingDonut';
import { useInsights } from '../hooks/useInsights';
import { useAppState } from '../hooks/useAppState';

const DashboardPage = () => {
  const { state } = useAppState();
  const { totals, monthlyComparison } = useInsights();

  // Calculate delta (% change vs last month)
  const getIncomeDelta = () => {
    if (monthlyComparison.length < 2) return 0;
    const latest = monthlyComparison[monthlyComparison.length - 1];
    const prev = monthlyComparison[monthlyComparison.length - 2];
    if (prev.income === 0) return 0;
    return ((latest.income - prev.income) / prev.income) * 100;
  };

  const getExpenseDelta = () => {
    if (monthlyComparison.length < 2) return 0;
    const latest = monthlyComparison[monthlyComparison.length - 1];
    const prev = monthlyComparison[monthlyComparison.length - 2];
    if (prev.expenses === 0) return 0;
    return ((latest.expenses - prev.expenses) / prev.expenses) * 100;
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
      {/* Page Title */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">
          Your financial overview at a glance
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <KPICard
          label="Total Balance"
          value={totals.balance}
          icon={Wallet}
          accent="#00D4AA"
          stagger={1}
        />
        <KPICard
          label="Total Income"
          value={totals.income}
          icon={ArrowDownLeft}
          accent="#F5A623"
          delta={getIncomeDelta()}
          stagger={2}
        />
        <KPICard
          label="Total Expenses"
          value={totals.expenses}
          icon={ArrowUpRight}
          accent="#FF5C6A"
          delta={getExpenseDelta()}
          stagger={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <BalanceTrendChart />
        <SpendingDonut />
      </div>
    </div>
  );
};

export default DashboardPage;
