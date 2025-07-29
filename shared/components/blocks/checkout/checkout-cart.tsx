import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { getCartItemDetails, getVaLidTranslation } from '@/shared/lib';
import { mapPizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';
import { useTranslations } from 'next-intl';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  updatingItems?: Record<number, boolean>;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  updatingItems,
  className,
}) => {
  const t = useTranslations();
  
  return (
    <WhiteBlock title={t('checkout.cartTitle')} className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  {
                    ingredients: item.ingredients,
                    t,
                    pizzaDetails: item.pizzaSize && item.pizzaType && 
                      t('cart.productDetails', { 
                        pizzaSize: item.pizzaSize,
                        typeName: getVaLidTranslation({key: mapPizzaType[item.pizzaType].translationKey, defaultValue: mapPizzaType[item.pizzaType].default, t}) 
                      })
                  }
                )}
                name={getVaLidTranslation({key: item.translationKey && `product.list.${item.translationKey}`, defaultValue: item.name, t})}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
                updating={Boolean(updatingItems?.[item.id])}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
