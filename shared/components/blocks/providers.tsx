'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import {NextIntlClientProvider} from 'next-intl';

export const Providers = ({ children, locale, messages}: { children: React.ReactNode, locale: string, messages: any }) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </NextIntlClientProvider>
      <Toaster />
      <NextTopLoader />
    </>
  );
};
