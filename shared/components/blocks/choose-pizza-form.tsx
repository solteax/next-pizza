'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';

import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { cn } from '@/shared/lib/utils';
import { getPizzaDetails, getVaLidTranslation, safePriceToNumber } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';
import { useTranslations } from 'next-intl';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const t = useTranslations();
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, pizzaType } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1 flex-col md:flex-row h-full')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="bg-[#f7f6f5] p-4 pt-1 md:p-7 w-full md:w-[490px] flex flex-col h-full overflow-y-auto">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">
          {
            t('product.form.pizzaDescription', { 
              size, 
              pizzaType: getVaLidTranslation({key: pizzaType.translationKey, defaultValue: pizzaType.default, t})
            })
          }
        </p>

        <div className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={getVaLidTranslation({key: ingredient.translationKey && `ingredient.${ingredient.translationKey}`, defaultValue: ingredient.name, t})}
                price={safePriceToNumber(ingredient.price)}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-4 md:mt-10 mb-0 md:mb-0"
        >
          {t('product.form.addButton', { totalPrice })}
        </Button>
      </div>
    </div>
  );
};
