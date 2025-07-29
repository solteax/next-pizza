'use client';

import React, { useTransition } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { useParams } from 'next/navigation';

interface LanguageSwitcherProps {
  isMobile?: boolean; // to handle mobile view
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isMobile = false }) => {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLanguage = locale.toUpperCase();

  const languages = [
    { code: 'en', name: t('english') || 'English' },
    { code: 'ua', name: t('ukrainian') || 'Ukrainian' },
    { code: 'ru', name: t('russian') || 'Russian' },
  ];

  const handleLanguageChange = (langCode: string) => {
    if (locale !== langCode) {
      startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: langCode}
      );
    });
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={cn(
            'flex items-center justify-center font-semibold rounded-full',
            isMobile
              ? 'h-8 px-3 text-xs bg-gray-100 hover:bg-gray-200'
              : 'h-10 px-4 text-sm bg-white hover:bg-gray-100'
          )}
          aria-label="Change language"
        >
          <svg className={cn("inline-block", isMobile ? "h-4 w-4 mr-1" : "h-5 w-5 mr-1")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.55 15L3 18m18-18l-9 9m0 0l-5 5m5-5a18.022 18.022 0 013.45 3.5L21 18"></path></svg>
          {currentLanguage}
          <svg className={cn("ml-1", isMobile ? "h-4 w-4" : "-mr-1 h-5 w-5")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={5}
          className="z-50 min-w-[120px] rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-bottom-[2%]"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isPending}
              className={cn(
                'block w-full text-left px-3 py-2 text-sm rounded-md',
                'hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                locale === lang.code ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700'
              )}
            >
              {lang.name}
            </button>
          ))}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};