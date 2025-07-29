'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { Loader } from '../ui';
import { useMedia } from 'react-use';
import { breakpoints } from '@/shared/constants';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
  updating?: boolean
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
  updating
}) => {
  const isMobile = useMedia(`(max-width: ${breakpoints.sm}px)`,)
  if(isMobile){
    return (
      <div
        className={cn(
          'flex bg-white p-5 gap-6',
          {
            'opacity-50 pointer-events-none': disabled,
          },
          className,
        )}>
        <CartItemDetails.Image src={imageUrl} />
        <div className="flex-1">
          <CartItemDetails.Info name={name} details={details} />
          <hr className="my-3" />

          <div className="flex items-center justify-between">
            <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} updating={updating} />
            {updating ? <Loader size={32} /> : <CartItemDetails.Price value={price} />}
            <button type="button" onClick={onClickRemove}>
              <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      {updating ? <Loader size={32} /> : <CartItemDetails.Price value={price} />}

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} updating={updating} />
        <button type="button" onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
