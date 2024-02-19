import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { Providers } from './providers';
import Sidebar from '@/components/navigation/Sidebar';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Form Manager',
  description: 'Form Manager main layout.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <div className='h-dvh flex flex-row justify-start'>
            <Sidebar />
            <div className='grid flex-1 p-4'>{children}</div>
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
