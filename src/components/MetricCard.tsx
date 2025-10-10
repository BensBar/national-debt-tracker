import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  badge?: string;
}

export function MetricCard({ label, value, icon, badge }: MetricCardProps) {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </h3>
        {icon && <div className="text-accent/70">{icon}</div>}
      </div>
      <div className="flex items-end justify-between gap-4">
        <p className="text-2xl font-semibold text-foreground font-mono tabular-nums">
          {value}
        </p>
        {badge && (
          <Badge variant="secondary" className="text-xs">
            {badge}
          </Badge>
        )}
      </div>
    </Card>
  );
}
