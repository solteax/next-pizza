'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useQueryFilters, useIngredients, useFilters } from '@/shared/hooks';
import { useTranslations } from 'next-intl';
import { safePriceToNumber } from '@/shared/lib';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  const t = useTranslations('filters');

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ ...item,value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text={t('title')} size="sm" className="mb-5 font-bold" />

      {/* Top checkboxes */}
      <CheckboxFiltersGroup
        title={t('pizzaTypesText')}
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: t('pizzaType.thin'), value: '1' },
          { text: t('pizzaType.traditional'), value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title={t('sizes.title')}
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: `20 ${t('sizes.sm')}`, value: '20' },
          { text: `30 ${t('sizes.sm')}`, value: '30' },
          { text: `40 ${t('sizes.sm')}`, value: '40' },
        ]}
      />

      {/* Filter by price */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">{t('pricesRangeTitle')}</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', safePriceToNumber(e.target.value))}
          />
          <Input
            type="number"
            min={1}
            max={100}
            placeholder="100"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', safePriceToNumber(+e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100]}
          onValueChange={updatePrices}
        />
      </div>

      {/* Filter by ingredients */}
      <CheckboxFiltersGroup
        title={t('ingredientsTitle')}
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
