'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session, status } = useSession();
  const t = useTranslations('header');
  const locale = useLocale();
  

  return (
    <div className={className}>
      {!session ? (
        <Button loading={status === 'loading'} onClick={onClickSignIn} variant={status !== 'loading' ? "outline" : undefined} className="flex items-center gap-1">
          <User size={16} />
          {t('signInButton')}
        </Button>
      ) : (
        <Link href={`/${locale}/profile`}>
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            {t('profileButton')}
          </Button>
        </Link>
      )}
    </div>
  );
};
