import type { Metadata } from 'next';
import './globals.css';
import ClientShell from '@/components/ClientShell/ClientShell';

export const metadata: Metadata = {
  title: 'Rithvik Inampudi — Portfolio',
  description: 'High school student interested in AI, computer science, and building projects with real-world impact.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
