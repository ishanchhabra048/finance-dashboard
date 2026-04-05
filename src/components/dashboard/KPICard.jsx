/**
 * KPICard — Summary stat card with icon, label, animated number, and delta badge.
 * Uses useCountUp hook for number animation on load.
 * DM Mono font for all numeric values.
 */
import React from 'react';
import Card from '../common/Card';
import { useCountUp } from '../../hooks/useCountUp';
import { formatCurrency } from '../../utils/formatCurrency';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const KPICard = ({ label, value, icon: Icon, accent, delta, stagger = 1 }) => {
  const animatedValue = useCountUp(value, 800);
  const isPositive = delta >= 0;

  return (
    <Card accent={accent} animate stagger={stagger}>
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon size={22} strokeWidth={1.5} style={{ color: accent }} />
        </div>

        {/* Delta Badge */}
        {delta !== undefined && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-badge text-xs font-medium font-number ${
              isPositive
                ? 'bg-accent-primary-dim text-accent-primary'
                : 'bg-accent-expense-dim text-accent-expense'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={12} strokeWidth={2} />
            ) : (
              <ArrowDownRight size={12} strokeWidth={2} />
            )}
            <span>{Math.abs(delta).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Label */}
      <p className="text-sm text-text-secondary mb-1">{label}</p>

      {/* Big Number — DM Mono */}
      <p className="text-2xl lg:text-hero font-medium font-number text-text-primary leading-tight">
        {formatCurrency(animatedValue)}
      </p>
    </Card>
  );
};

export default KPICard;
