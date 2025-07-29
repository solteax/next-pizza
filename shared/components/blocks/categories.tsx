'use client';

import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const t = useTranslations('category')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number, name: string) => {
    e.preventDefault();
    setTimeout(() => {
      useCategoryStore.getState().setActiveId(id);
      window.history.pushState(null, '', `#${name}`);
      document.getElementById(name)?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Test delay for hydration
  };
  
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl w-full', className)}>
      {items.map(({ name, id, translationKey }, index) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href={`/#${translationKey || name}`}
          key={index}
          onClick={(e) => handleClick(e, id, translationKey || name)}
        >
          {translationKey ? t(translationKey) : name}
        </a>
      ))}
    </div>
  );
};
