import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CountryDebt, 
  getDebtToGDPRatio, 
  getDebtPerCapita 
} from '@/lib/country-debt-data';
import { formatCurrency, formatNumber } from '@/lib/debt-utils';

interface CountryComparisonProps {
  country: CountryDebt;
  maxDebt: number;
  usDebt: number;
  rank: number;
}

export function CountryComparison({ 
  country, 
  maxDebt, 
  usDebt,
  rank 
}: CountryComparisonProps) {
  const debtToGDP = getDebtToGDPRatio(country);
  const perCapita = getDebtPerCapita(country);
  const percentOfMax = (country.debt / maxDebt) * 100;
  const percentOfUS = (country.debt / usDebt) * 100;
  const isUS = country.code === 'US';

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-colors">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">{getFlagEmoji(country.code)}</span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {country.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Pop: {formatNumber(country.population)}
                </p>
              </div>
            </div>
          </div>
          <Badge 
            variant={rank === 1 ? "default" : "secondary"} 
            className={rank === 1 ? "bg-accent text-accent-foreground" : ""}
          >
            #{rank}
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">Total Debt</span>
            </div>
            <div className="mb-2">
              <span className="text-xl font-mono font-semibold text-foreground break-words">
                {formatCurrency(country.debt)}
              </span>
            </div>
            <Progress value={percentOfMax} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Per Capita</p>
              <p className="text-sm font-semibold font-mono text-foreground break-words">
                {formatCurrency(perCapita)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Debt-to-GDP</p>
              <p className="text-sm font-semibold font-mono text-foreground">
                {debtToGDP.toFixed(1)}%
              </p>
            </div>
          </div>

          {!isUS && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                {percentOfUS.toFixed(1)}% of U.S. debt
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function getFlagEmoji(countryCode: string): string {
  const flags: Record<string, string> = {
    US: '🇺🇸',
    CN: '🇨🇳',
    JP: '🇯🇵',
    GB: '🇬🇧',
    FR: '🇫🇷',
    DE: '🇩🇪',
    IT: '🇮🇹',
    CA: '🇨🇦',
    BR: '🇧🇷',
    IN: '🇮🇳',
  };
  return flags[countryCode] || '🏳️';
}
