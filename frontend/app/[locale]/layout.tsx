import type { Metadata } from 'next';
import { AppStateProvider } from 'app-state';
import './globals.css';
import { getDictionary } from './dictionaries';
import Providers from './providers';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  let filteredLocale = params.locale;
  if (filteredLocale !== 'nl' && filteredLocale !== 'en') {
    filteredLocale = 'nl';
  }

  const dict = await getDictionary(filteredLocale);

  return {
    title: dict.meta.title,
    description: dict.meta.description
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  let loc = params.locale ?? 'nl';
  if (loc !== 'nl' && loc !== 'en') {
    loc = 'nl';
  }

  return (
    <html lang={loc}>
      <body className="min-h-screen relative">
        <div className="lg:pb-[477px] pb-[589px] h-full">
          <AppStateProvider>
            <Providers>{children}</Providers>
          </AppStateProvider>
        </div>
      </body>
    </html>
  );
}
