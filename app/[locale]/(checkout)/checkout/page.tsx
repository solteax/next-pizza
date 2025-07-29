'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from '@/shared/components';
import { useCart, useCheckoutFormSchema } from '@/shared/hooks';
import toast from 'react-hot-toast';
import { createOrder } from '@/app/[locale]/actions';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';
import { useTranslations } from 'next-intl';
import { calcOrderTotalPrice } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import { z } from "zod"

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading, updatingItems } = useCart();
  const { data: session, status } = useSession();
  const t = useTranslations('checkout');
  const router = useRouter();
  const checkoutFormSchema = useCheckoutFormSchema();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);
  
  if(!totalAmount && status !== 'loading' && !loading) {
    return router.push('/');
  }

  const onSubmit = async (data: z.infer<typeof checkoutFormSchema>) => {
    try {
      setSubmitting(true);

      await createOrder(data, totalAmount, {
        emailTitle: t('orderEmail.emailTitle'),
        messageTitle: t('orderEmail.messageTitle'),
        paymentMessage: t.rich('orderEmail.paymentMessage', {
          totalAmount: calcOrderTotalPrice(totalAmount).totalPrice,
          b: (chunks) => <b>{chunks}</b>,
          link: (chunks) => (
            // draft for payment url
            <a href={'#'} target="_blank" rel="noopener noreferrer">
              {chunks}
            </a>
          )
        })
      });

      toast.error(t('toast.success'), {
        icon: '✅',
      });

      setTimeout(() => {
        setSubmitting(false);
        router.push('/');
      }, 5000);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error(t('toast.failed'), {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text={t('title')} className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("❌ Validation errors:", errors);
        })}>
          <div className="flex gap-10 flex-col lg:flex-row">
            {/* Left side */}
            <div className="flex flex-col gap-10 flex-1 mb-4 lg:mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
                updatingItems={updatingItems}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} t={t} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} t={t} />
            </div>

            {/* Right side */}
            <div className="w-[450px] mx-auto lg:mx-0">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} t={t} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
