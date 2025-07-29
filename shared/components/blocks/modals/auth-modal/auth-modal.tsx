'use client';

import { Button } from '@/shared/components';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { useTranslations } from 'next-intl';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AUTH_TYPE = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const t = useTranslations('auth');
  const [type, setType] = React.useState(AUTH_TYPE.LOGIN);

  const onSwitchType = () => {
    setType(type === AUTH_TYPE.LOGIN ? AUTH_TYPE.REGISTER : AUTH_TYPE.LOGIN);
  };

  const handleClose = () => {
    onClose();
    setType(AUTH_TYPE.LOGIN);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === AUTH_TYPE.LOGIN ? (
          <LoginForm onClose={handleClose} t={t} />
        ) : (
          <RegisterForm onClose={handleClose} t={t} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: process.env.NEXT_PUBLIC_SITE_URL || '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? t('loginButton') : t('registerButton')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
