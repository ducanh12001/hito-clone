'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--success-bg': 'var(--color-green-500)',
          '--success-border': 'var(--border)',
          '--success-text': 'var(--primary-foreground)',
          '--error-bg': 'var(--color-destructive)',
          '--error-border': 'var(--border)',
          '--error-text': 'var(--primary-foreground)',
          '--border-radius': '16px',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          icon: '!hidden',
          content: 'text-sm',
          title: '!font-bold',
          description: '!font-bold',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
