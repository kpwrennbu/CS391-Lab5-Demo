// TODO(1): import AntD reset css (ONE LINE)
import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Mini Demo',
  description: 'Next + AntD + API params',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
