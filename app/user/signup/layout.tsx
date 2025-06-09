import type { Metadata } from 'next';

import { SignupLayout } from '@/components/layouts/signup-layout';

export const metadata: Metadata = {
  title: 'Hitode',
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SignupLayout>{children}</SignupLayout>;
}
