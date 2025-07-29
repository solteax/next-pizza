'use client';

import React from 'react';
import Image from 'next/image';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails, getVaLidTranslation } from '@/shared/lib';
import { mapPizzaType } from '@/shared/constants/pizza';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/shared/hooks';
import { useLocale, useTranslations } from 'next-intl';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, updatingItems } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  const t = useTranslations();
  const locale = useLocale();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                {t.rich('cart.itemCount', {
                  count: items.length,
                  bold: (chunks) => <span className="font-bold">{chunks}</span>
                })}
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text={t('cart.emptyTitle')} className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                {t('cart.emptyMessage')}
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  {t('cart.backButton')}
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
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
                      disabled={item.disabled}
                      name={getVaLidTranslation({key: item.translationKey && `product.list.${item.translationKey}`, defaultValue: item.name, t})}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                      updating={Boolean(updatingItems?.[item.id])}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      {t('cart.total')}
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} $</span>
                  </div>

                  <Link href={`/${locale}/checkout`}>
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      {t('cart.checkoutButton')}
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
