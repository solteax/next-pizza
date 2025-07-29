'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/[locale]/actions';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import { useTranslations } from 'next-intl';
import { useAuthFormSchema } from '@/shared/hooks';
import { z } from "zod"

interface Props {
  onClose?: VoidFunction;
  t: ReturnType<typeof useTranslations>;
}

export const RegisterForm: React.FC<Props> = ({ onClose, t }) => {
  const { formRegisterSchema } = useAuthFormSchema()
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formRegisterSchema>) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error(t('toast.register.success'), {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error(t('toast.register.error'), {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label={t('email')} required />
        <FormInput name="fullName" label={t('fullName')} required />
        <FormInput name="password" label={t('password')} type="password" required />
        <FormInput name="confirmPassword" label={t('confirmPassword')} type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          {t('registerButton')}
        </Button>
      </form>
    </FormProvider>
  );
};
