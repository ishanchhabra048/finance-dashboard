/**
 * InsightsPage — Route: /insights
 * Shows key financial observations, highest spending category,
 * monthly comparison bar chart, and spending breakdown.
 */
import React from 'react';
import InsightCard from '../components/insights/InsightCard';
import MonthlyComparison from '../components/insights/MonthlyComparison';
import Card from '../components/common/Card';
import { useInsights } from '../hooks/useInsights';
import { useAppState } from '../hooks/useAppState';
import { getCategoryColor } from '../data/categories';
import { formatCurrency } from '../utils/formatCurrency';

const InsightsPage = () => {
  const { state } = useAppState();
  const { observations, spendingByCategory, totals, highestCategory } = useInsights();

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
        <h1 className="text-2xl font-semibold text-text-primary">Insights</h1>
        <p className="text-sm text-text-secondary mt-1">
          Key observations from your financial data
        </p>
      </div>

      {/* Key Observations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {observations.map((insight, index) => (
          <InsightCard key={insight.id} insight={insight} stagger={index + 1} />
        ))}
      </div>

      {/* Monthly Comparison Chart */}
      <MonthlyComparison />

      {/* Spending Breakdown Table */}
      <Card animate stagger={5}>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          Spending by Category
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Breakdown of all expenses by category
        </p>

        <div className="space-y-3">
          {spendingByCategory.map((item) => {
            const pct = totals.expenses > 0
              ? ((item.amount / totals.expenses) * 100).toFixed(1)
              : 0;
            const color = getCategoryColor(item.category);

            return (
              <div key={item.category} className="group">
                {/* Label row */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-text-primary">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted font-number">{pct}%</span>
                    <span className="text-sm font-number text-text-primary">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-bg-base rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default InsightsPage;
