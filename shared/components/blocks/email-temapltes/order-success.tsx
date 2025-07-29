import { safePriceToNumber } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Thank you for your order 🎉</h1>

    <p>Your order #{orderId} is paid. The details:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {safePriceToNumber(item.productItem.price)} $ x {item.quantity} ={' '}
          {safePriceToNumber(item.productItem.price) * item.quantity} $
        </li>
      ))}
    </ul>
  </div>
);
