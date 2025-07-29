'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/[locale]/actions';
import { useTranslations } from 'next-intl';
import { useAuthFormSchema } from '@/shared/hooks';
import { z } from "zod"

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const t = useTranslations('profile');
  const { formRegisterSchema } = useAuthFormSchema()
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formRegisterSchema>) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error(t('toast.success'), {
        icon: '✅',
      });
    } catch (error) {
      return toast.error(t('toast.error'), {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10 mx-auto flex flex-col items-center">
      <Title text={t('title', { id: data.id })} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label={t('email')} required />
          <FormInput name="fullName" label={t('fullName')} required />

          <FormInput type="password" name="password" label={t('password')} required />
          <FormInput type="password" name="confirmPassword" label={t('confirmPassword')} required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            {t('saveButton')}
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            {t('signOutButton')}
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
