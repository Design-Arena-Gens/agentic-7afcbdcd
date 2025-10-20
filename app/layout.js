import './globals.css';
import { Roboto } from 'next/font/google';

export const metadata = {
  title: 'Sales Performance Dashboard',
  description: 'Responsive, accessible sales performance analytics',
};

const roboto = Roboto({ subsets: ['latin'], weight: ['300','400','500','700'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
