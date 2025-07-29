'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store';
import { ProductWithRelations } from '@/@types/prisma';
import { useTranslations } from 'next-intl';
import { getVaLidTranslation, safePriceToNumber } from '@/shared/lib';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  categoryName: string;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  categoryName,
  className,
}) => {
  const t = useTranslations('product.list')
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);
  
  return (
    <div className={cn(className, 'scroll-mt-24')} id={categoryName} ref={intersectionRef}> 
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={getVaLidTranslation({ defaultValue: product.name, key: product.translationKey, t })}
            imageUrl={product.imageUrl}
            price={safePriceToNumber(product.items[0].price)}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
