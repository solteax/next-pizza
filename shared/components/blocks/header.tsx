'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';
import { useLocale, useTranslations } from 'next-intl';
import { LanguageSwitcher } from './language-switcher';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  const t = useTranslations();
  const locale = useLocale();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = t('status.order_paid_success');
    }

    if (searchParams.has('verified')) {
      toastMessage = t('status.email_verified_success');
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-8">
        <div className="flex items-center justify-between w-full mb-2 sm:mb-0 flex-col gap-4 sm:flex-row sm:gap-0">
          {/* Left side */}
          <Link href={`/${locale}`}>
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Logo" width={35} height={35} />
              <div>
                <h1 className="text-xl xs:text-2xl uppercase font-black">{t('header.logoTitle')}</h1>
              </div>
            </div>
          </Link>

          {hasSearch && (
            <div className="mx-10 flex-1 hidden min-850:block">
              <SearchInput placeholder={t('header.search_pizza_placeholder')} />
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

            {hasCart && <CartButton />}

            {/* language switcher for mobile only */}
            <div className="flex justify-end w-full sm:hidden">
              <LanguageSwitcher isMobile={true} />
            </div>
          </div>
        </div>

        {/* language switcher for desktop */}
        <div className="hidden sm:inline-block mx-2">
          <LanguageSwitcher isMobile={false} />
        </div>

      </Container>
    </header>
  );
};
