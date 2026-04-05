/**
 * InsightCard — Single insight item with icon, title, description, and highlighted value.
 * Horizontal layout: icon left, text right.
 * Background gradient from surface to transparent.
 */
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Info, Percent, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const typeConfig = {
  positive: { icon: TrendingUp, color: '#00D4AA', bg: 'rgba(0, 212, 170, 0.08)' },
  negative: { icon: TrendingDown, color: '#FF5C6A', bg: 'rgba(255, 92, 106, 0.08)' },
  warning: { icon: AlertTriangle, color: '#F5A623', bg: 'rgba(245, 166, 35, 0.08)' },
  info: { icon: Info, color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.08)' },
};

const InsightCard = ({ insight, stagger = 1 }) => {
  const config = typeConfig[insight.type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <div
      className={`flex items-start gap-4 p-5 rounded-card border border-bg-border animate-card stagger-${stagger}`}
      style={{
        background: `linear-gradient(135deg, ${config.bg}, transparent)`,
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${config.color}18` }}
      >
        <IconComponent size={22} strokeWidth={1.5} style={{ color: config.color }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text-primary mb-1">{insight.title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{insight.description}</p>
        {insight.value !== undefined && (
          <p className="text-lg font-medium font-number mt-2" style={{ color: config.color }}>
            {insight.id === 'savings-rate'
              ? `${insight.value}%`
              : formatCurrency(insight.value)}
          </p>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
