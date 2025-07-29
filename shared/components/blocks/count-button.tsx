'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CountIconButton } from './count-icon-button';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClick?: (type: 'plus' | 'minus') => void;
  className?: string;
  updating?: boolean;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
  updating
}) => {
  const [count, setCount] = React.useState(value);
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => {
          setCount((prev) => prev - 1);
          onClick?.('minus')
        }}
        disabled={value === 1 || updating}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{count}</b>

      <CountIconButton 
        onClick={() => {
          setCount((prev) => prev + 1);
          onClick?.('plus')
        }} 
        size={size} 
        type="plus"
        disabled={updating}
      />
    </div>
  );
};
