/**
 * BalanceTrendChart — Line/Area chart showing monthly balance trend.
 * Uses Recharts with gradient fill, dashed grid, custom dark tooltip.
 */
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../common/Card';
import { formatCompact, formatCurrency } from '../../utils/formatCurrency';
import { useInsights } from '../../hooks/useInsights';

/** Custom dark tooltip matching design spec */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-accent-primary/30 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-text-secondary mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-number" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

const BalanceTrendChart = () => {
  const { balanceTrend } = useInsights();

  return (
    <Card animate stagger={4} className="col-span-full lg:col-span-2">
      <h3 className="text-lg font-semibold text-text-primary mb-1">Balance Trend</h3>
      <p className="text-sm text-text-secondary mb-6">Monthly cumulative balance over time</p>

      <div className="h-[260px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="balance"
              name="Balance"
              stroke="#00D4AA"
              strokeWidth={2}
              fill="url(#balanceGradient)"
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BalanceTrendChart;
