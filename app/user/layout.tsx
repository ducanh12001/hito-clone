import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hitode',
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background-primary h-dvh w-full overflow-y-auto sm:mx-auto sm:max-w-md">
      {children}
    </div>
  );
}
