// src/app/layout.tsx

import './globals.css';
import { Providers } from '@/providers/providers';

/*const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap'
})

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});*/

export const metadata = {
  title: 'Easy Rental',
  description: 'Location de véhicules simplifié',
};

export default function RootLayout(
  {children,}: { children: React.ReactNode; }
) {
  return (
    <html lang="en">
    <body>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  );
}
