export interface CountryDebt {
  name: string;
  code: string;
  debt: number;
  population: number;
  gdp: number;
  currency: string;
  lastUpdated: string;
}

export const COUNTRY_DEBT_DATA: CountryDebt[] = [
  {
    name: 'United States',
    code: 'US',
    debt: 36000000000000,
    population: 340000000,
    gdp: 27360000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'China',
    code: 'CN',
    debt: 14300000000000,
    population: 1425000000,
    gdp: 17960000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'Japan',
    code: 'JP',
    debt: 10100000000000,
    population: 123000000,
    gdp: 4230000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    debt: 3100000000000,
    population: 68000000,
    gdp: 3340000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'France',
    code: 'FR',
    debt: 3400000000000,
    population: 68000000,
    gdp: 3050000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'Germany',
    code: 'DE',
    debt: 3000000000000,
    population: 84000000,
    gdp: 4500000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'Italy',
    code: 'IT',
    debt: 3200000000000,
    population: 59000000,
    gdp: 2250000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'Canada',
    code: 'CA',
    debt: 2100000000000,
    population: 39000000,
    gdp: 2240000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'Brazil',
    code: 'BR',
    debt: 1800000000000,
    population: 216000000,
    gdp: 2330000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
  {
    name: 'India',
    code: 'IN',
    debt: 2700000000000,
    population: 1428000000,
    gdp: 3740000000000,
    currency: 'USD',
    lastUpdated: '2024-12',
  },
];

export function getDebtToGDPRatio(country: CountryDebt): number {
  return (country.debt / country.gdp) * 100;
}

export function getDebtPerCapita(country: CountryDebt): number {
  return country.debt / country.population;
}

export function compareWithUS(country: CountryDebt, usDebt: number): number {
  return (country.debt / usDebt) * 100;
}

export function getSortedCountriesByDebt(): CountryDebt[] {
  return [...COUNTRY_DEBT_DATA].sort((a, b) => b.debt - a.debt);
}

export function getSortedCountriesByDebtToGDP(): CountryDebt[] {
  return [...COUNTRY_DEBT_DATA].sort((a, b) => 
    getDebtToGDPRatio(b) - getDebtToGDPRatio(a)
  );
}

export function getSortedCountriesByPerCapita(): CountryDebt[] {
  return [...COUNTRY_DEBT_DATA].sort((a, b) => 
    getDebtPerCapita(b) - getDebtPerCapita(a)
  );
}
