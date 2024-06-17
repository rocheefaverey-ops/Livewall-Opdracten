import './[locale]/globals.css';

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale ?? 'nl'}>
      <body>{children}</body>
    </html>
  );
}
