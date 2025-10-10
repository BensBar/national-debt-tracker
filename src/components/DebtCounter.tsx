import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { formatCurrency } from '@/lib/debt-utils';

interface DebtCounterProps {
  initialDebt: number;
  debtPerSecond: number;
}

export function DebtCounter({ initialDebt, debtPerSecond }: DebtCounterProps) {
  const [currentDebt, setCurrentDebt] = useState(initialDebt);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDebt((prev) => prev + debtPerSecond / 60);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [debtPerSecond]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-accent/10 blur-3xl counter-glow" />
      <motion.div
        className="relative text-center font-mono font-bold text-accent"
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {formatCurrency(currentDebt)}
      </motion.div>
    </div>
  );
}
