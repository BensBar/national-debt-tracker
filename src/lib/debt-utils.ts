export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export async function fetchNationalDebt() {
  try {
    const response = await fetch(
      'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch debt data');
    }
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const latestRecord = data.data[0];
      return {
        amount: parseFloat(latestRecord.tot_pub_debt_out_amt),
        date: latestRecord.record_date,
      };
    }
    
    throw new Error('No debt data available');
  } catch (error) {
    console.error('Error fetching national debt:', error);
    throw error;
  }
}

export function calculateDebtPerSecond(totalDebt: number): number {
  const annualDeficit = 1.7e12;
  return annualDeficit / (365 * 24 * 60 * 60);
}

export function calculateCurrentDebt(baseDebt: number, baseTimestamp: string): number {
  const baseDate = new Date(baseTimestamp);
  const now = new Date();
  const secondsElapsed = (now.getTime() - baseDate.getTime()) / 1000;
  const debtPerSecond = calculateDebtPerSecond(baseDebt);
  
  return baseDebt + (debtPerSecond * secondsElapsed);
}

export const US_POPULATION = 340000000;
