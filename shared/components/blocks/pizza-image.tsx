import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div className={cn('flex items-center justify-center relative flex-1 w-full min-h-[250px] h-[30vh] md:min-h-0 md:h-auto overflow-hidden', className)}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn('relative w-32 h-32 top-0 left-0 object-contain left-1 top-1 md:left-2 md:top-2 transition-all z-10 duration-300', {
          'w-[120px] h-[120px] md:w-[300px] md:h-[300px]': size === 20,
          'w-[160px] h-[160px] md:w-[400px] md:h-[400px]': size === 30,
          'w-[220px] h-[220px] md:w-[500px] md:h-[500px]': size === 40,
        })}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[200px] h-[200px] md:w-[450px] md:h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[150px] h-[150px] md:w-[370px] md:h-[370px]" />
    </div>
  );
};
