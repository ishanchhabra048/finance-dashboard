/**
 * MonthlyComparison — Grouped bar chart comparing income vs expenses per month.
 * Uses Recharts BarChart with rounded top corners and accent fills.
 */
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Card from '../common/Card';
import { useInsights } from '../../hooks/useInsights';
import { formatCompact, formatCurrency } from '../../utils/formatCurrency';

/** Custom dark tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-bg-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-text-secondary mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-number" style={{ color: entry.fill }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

/** Custom legend */
const CustomLegend = ({ payload }) => (
  <div className="flex items-center justify-center gap-6 mt-4">
    {payload?.map((entry, i) => (
      <div key={i} className="flex items-center gap-2 text-xs">
        <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
        <span className="text-text-secondary">{entry.value}</span>
      </div>
    ))}
  </div>
);

const MonthlyComparison = () => {
  const { monthlyComparison } = useInsights();

  return (
    <Card animate stagger={3}>
      <h3 className="text-lg font-semibold text-text-primary mb-1">Monthly Comparison</h3>
      <p className="text-sm text-text-secondary mb-6">Income vs Expenses by month</p>

      <div className="h-[280px] lg:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyComparison}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#242836" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8892A4', fontSize: 11, fontFamily: 'DM Mono' }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8892A4', fontSize: 11, fontFamily: 'DM Mono' }}
              tickFormatter={(v) => formatCompact(v)}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#F5A623"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#FF5C6A"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MonthlyComparison;
