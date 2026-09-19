import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import CircuitBackground from '@/components/CircuitBackground/CircuitBackground';
import Cursor from '@/components/Cursor/Cursor';

const sans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
});

const mono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rithvik Inampudi | Portfolio',
  description: 'High school student interested in AI, computer science, and building projects with real-world impact.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <CircuitBackground />
        <Navbar />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
