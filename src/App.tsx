import { useEffect, useState } from 'react';
import { DebtCounter } from '@/components/DebtCounter';
import { MetricCard } from '@/components/MetricCard';
import { CountryComparison } from '@/components/CountryComparison';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { 
  TrendUp, 
  Users, 
  Calendar, 
  Warning,
  ClockCounterClockwise,
  Globe,
  ChartBar,
  Coins
} from '@phosphor-icons/react';
import {
  fetchNationalDebt,
  calculateDebtPerSecond,
  calculateCurrentDebt,
  formatCurrency,
  formatNumber,
  US_POPULATION,
} from '@/lib/debt-utils';
import {
  getSortedCountriesByDebt,
  getSortedCountriesByDebtToGDP,
  getSortedCountriesByPerCapita,
} from '@/lib/country-debt-data';
import { toast } from 'sonner';

function App() {
  const [debtData, setDebtData] = useState<{
    amount: number;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadDebtData();
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  async function loadDebtData() {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchNationalDebt();
      setDebtData(data);
      toast.success('Debt data loaded successfully');
    } catch (err) {
      setError('Failed to load debt data. Using cached estimate.');
      setDebtData({
        amount: 35000000000000,
        date: new Date().toISOString().split('T')[0],
      });
      toast.error('Failed to fetch live data');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!debtData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Alert className="max-w-md">
          <Warning className="h-5 w-5" />
          <AlertDescription>
            Unable to load debt data. Please try again.
            <Button onClick={loadDebtData} className="mt-4 w-full">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const currentDebt = calculateCurrentDebt(debtData.amount, debtData.date);
  const debtPerSecond = calculateDebtPerSecond(debtData.amount);
  const debtPerCitizen = currentDebt / US_POPULATION;
  const debtPerDay = debtPerSecond * 60 * 60 * 24;

  const dataAge = Math.floor(
    (new Date().getTime() - new Date(debtData.date).getTime()) / (1000 * 60 * 60 * 24)
  );

  const countriesByDebt = getSortedCountriesByDebt();
  const countriesByDebtToGDP = getSortedCountriesByDebtToGDP();
  const countriesByPerCapita = getSortedCountriesByPerCapita();
  const maxDebt = countriesByDebt[0].debt;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <header className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
            United States National Debt
          </h1>
          
          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <Warning className="h-5 w-5" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {dataAge > 7 && (
            <Alert className="max-w-2xl mx-auto border-accent/50 bg-accent/5">
              <Calendar className="h-5 w-5 text-accent" />
              <AlertDescription>
                Data is {dataAge} days old. Estimates are being used for current calculations.
              </AlertDescription>
            </Alert>
          )}

          <div className="py-8">
            <DebtCounter initialDebt={currentDebt} debtPerSecond={debtPerSecond} />
          </div>

          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <ClockCounterClockwise className="h-4 w-4" />
            Updates every frame - Last data: {new Date(debtData.date).toLocaleDateString()}
          </p>
        </header>

        <Separator className="bg-border/50" />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Per Citizen"
            value={formatCurrency(debtPerCitizen)}
            icon={<Users size={24} />}
            badge={`${formatNumber(US_POPULATION)} people`}
          />
          
          <MetricCard
            label="Per Second"
            value={formatCurrency(debtPerSecond)}
            icon={<TrendUp size={24} />}
          />
          
          <MetricCard
            label="Per Day"
            value={formatCurrency(debtPerDay)}
            icon={<TrendUp size={24} />}
          />
          
          <MetricCard
            label="Per Year (Est.)"
            value={formatCurrency(debtPerSecond * 60 * 60 * 24 * 365)}
            icon={<TrendUp size={24} />}
          />
        </section>

        <section className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">About This Data</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The United States national debt represents the total amount of money the federal 
              government owes to creditors. This includes debt held by the public and 
              intragovernmental holdings.
            </p>
            <p>
              Data is sourced from the U.S. Department of the Treasury's Fiscal Data API. 
              The real-time counter estimates growth based on recent deficit trends. 
              Actual debt figures are updated daily by the Treasury.
            </p>
            <p>
              The per-second increase is calculated based on an estimated annual deficit. 
              This rate can vary significantly based on government spending and revenue.
            </p>
          </div>
        </section>

        <Separator className="bg-border/50" />

        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe size={32} className="text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Global Debt Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare national debts across the world's largest economies
            </p>
          </div>

          <Tabs defaultValue="total" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="total" className="flex items-center gap-2">
                <ChartBar size={18} />
                <span className="hidden sm:inline">Total Debt</span>
                <span className="sm:hidden">Total</span>
              </TabsTrigger>
              <TabsTrigger value="gdp" className="flex items-center gap-2">
                <TrendUp size={18} />
                <span className="hidden sm:inline">Debt-to-GDP</span>
                <span className="sm:hidden">GDP %</span>
              </TabsTrigger>
              <TabsTrigger value="capita" className="flex items-center gap-2">
                <Coins size={18} />
                <span className="hidden sm:inline">Per Capita</span>
                <span className="sm:hidden">Per Person</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="total" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countriesByDebt.map((country, index) => (
                  <CountryComparison
                    key={country.code}
                    country={country}
                    maxDebt={maxDebt}
                    usDebt={currentDebt}
                    rank={index + 1}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gdp" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countriesByDebtToGDP.map((country, index) => (
                  <CountryComparison
                    key={country.code}
                    country={country}
                    maxDebt={maxDebt}
                    usDebt={currentDebt}
                    rank={index + 1}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="capita" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countriesByPerCapita.map((country, index) => (
                  <CountryComparison
                    key={country.code}
                    country={country}
                    maxDebt={maxDebt}
                    usDebt={currentDebt}
                    rank={index + 1}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-muted/30 border border-border/50 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground">
              International debt figures are estimates converted to USD as of January 2025. 
              Sources: IMF, World Bank, National Treasury Departments.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;