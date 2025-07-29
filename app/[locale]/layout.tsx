import type { Metadata } from 'next';
import { Providers } from '@/shared/components/blocks/providers';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import './globals.css'; 

import { Nunito } from 'next/font/google';
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});


export const metadata: Metadata = {
  title: 'Next Pizza | Home',
};

type Translations = {
  [key: string]: string | Translations;
};

export default async function RootLocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages:Translations = (await import(`@/public/locales/${locale}.json`)).default;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}> 
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body className={nunito.className}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
