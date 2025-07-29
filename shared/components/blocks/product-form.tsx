'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { useTranslations } from 'next-intl';
import { getVaLidTranslation, safePriceToNumber } from '@/shared/lib';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
  const t = useTranslations('product');

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const productName = getVaLidTranslation({ defaultValue: product.name, key: product.translationKey && `list.${product.translationKey}`, t });

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(t('form.successToast', { productName }));

      _onSubmit?.();
    } catch (err) {
      toast.error('form.errorToast');
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={productName}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }
  
  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={productName}
      onSubmit={onSubmit}
      price={safePriceToNumber(firstItem.price)}
      loading={loading}
    />
  );
};
