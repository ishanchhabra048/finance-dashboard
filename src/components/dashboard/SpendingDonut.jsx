/**
 * SpendingDonut — Donut/Pie chart showing categorical spending breakdown.
 * Inner label shows total expenses. Segments use design system chart palette.
 */
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { useInsights } from '../../hooks/useInsights';
import { getCategoryColor } from '../../data/categories';
import { formatCurrency } from '../../utils/formatCurrency';

/** Custom dark tooltip */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="bg-bg-elevated border border-bg-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-text-secondary mb-1">{data.name}</p>
      <p className="text-sm font-number text-text-primary">
        {formatCurrency(data.value)}
      </p>
    </div>
  );
};

const SpendingDonut = () => {
  const { spendingByCategory, totals } = useInsights();

  // Map category spending to chart data with colors
  const chartData = spendingByCategory.map((item) => ({
    name: item.category,
    value: item.amount,
    color: getCategoryColor(item.category),
  }));

  return (
    <Card animate stagger={5}>
      <h3 className="text-lg font-semibold text-text-primary mb-1">Spending Breakdown</h3>
      <p className="text-sm text-text-secondary mb-6">By category</p>

      <div className="h-[260px] lg:h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={2}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label — total expenses */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-text-secondary">Total Spent</p>
          <p className="text-xl font-medium font-number text-text-primary">
            {formatCurrency(totals.expenses)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {chartData.slice(0, 6).map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-text-secondary truncate">{item.name}</span>
            <span className="font-number text-text-primary ml-auto">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SpendingDonut;
