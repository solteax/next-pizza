import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useAuthFormSchema } from '@/shared/hooks';
import { z } from "zod"

interface Props {
  onClose?: VoidFunction;
  t: ReturnType<typeof useTranslations>;
}

export const LoginForm: React.FC<Props> = ({ onClose, t }) => {
  // const passwordSchema = getPasswordSchema(t);
  const { formLoginSchema } = useAuthFormSchema()
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formLoginSchema>) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success(t('toast.login.success'), {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error(t('toast.login.error'), {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text={t('title')} size="md" className="font-bold" />
            <p className="text-gray-400">{t('subtitle')}</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label={t('email')} required />
        <FormInput name="password" label={t('password')} type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          {t('loginButton')}
        </Button>
      </form>
    </FormProvider>
  );
};
