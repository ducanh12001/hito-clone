'use client';

import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';

interface FormDatePickerProps {
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  showRequiredIcon?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (dateString: string) => void;
  disabled?: boolean;
  name?: string;
}

export const FormDatePicker = React.forwardRef<
  HTMLButtonElement,
  FormDatePickerProps
>(
  (
    {
      label,
      description,
      required = false,
      className,
      labelClassName,
      showRequiredIcon = false,
      placeholder = '日付を選択',
      value,
      onChange,
      disabled = false,
      name,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dateValue = value ? new Date(value) : undefined;

    useEffect(() => {
      const updateWidth = () => {
        if (triggerRef.current) {
          setTriggerWidth(triggerRef.current.offsetWidth);
        }
      };

      updateWidth();

      window.addEventListener('resize', updateWidth);

      return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleDateSelect = (date: Date | undefined) => {
      const dateString = date ? date.toISOString().split('T')[0] : '';
      onChange?.(dateString);

      if (date) {
        setIsOpen(false);
      }
    };

    return (
      <FormItem className={className}>
        {name && <input type="hidden" name={name} value={value || ''} />}

        {label && (
          <FormLabel
            className={cn('text-sm leading-3.5 font-medium', labelClassName)}
          >
            {label}
            {showRequiredIcon && required && (
              <Badge className="text-destructive rounded-full bg-[#FEE8E7] px-2.5 py-[2px]">
                必須
              </Badge>
            )}
          </FormLabel>
        )}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                ref={(node) => {
                  if (typeof ref === 'function') {
                    ref(node);
                  } else if (ref) {
                    ref.current = node;
                  }
                  triggerRef.current = node;
                }}
                variant="outline"
                disabled={disabled}
                className={cn(
                  'text-foreground border-input hover:text-foreground h-14 w-full justify-start text-left font-medium',
                  'transition-[color,box-shadow,border-color] outline-none',
                  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                  isOpen && '!shadow-focus-ring',
                )}
              >
                <CalendarIcon className="size-5" />
                {dateValue ? (
                  format(dateValue, 'yyyy年MM月dd日', { locale: ja })
                ) : (
                  <span className="text-muted-foreground font-normal">
                    {placeholder}
                  </span>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent
            className="mt-1 overflow-auto rounded-2xl"
            align="start"
            style={{ width: triggerWidth || 'auto' }}
          >
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
              classNames={{
                month: 'flex flex-col gap-5',
                caption_label: 'font-medium text-lg',
                nav_button:
                  'size-9 cursor-pointer hover:bg-slate-300 rounded-full p-0 flex items-center justify-center transition-colors border border-input opacity-50',
                nav_icon: 'size-5',
                head_row: 'grid grid-cols-7 mb-1',
                head_cell:
                  'text-muted-foreground rounded-md font-medium text-base',
                row: 'grid grid-cols-7 mt-2',
                cell: cn(
                  'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
                  '[&:has([aria-selected])]:rounded-md',
                ),
                day: cn(
                  buttonVariants({ variant: 'ghost' }),
                  'size-11 p-0 font-inter font-normal text-lg aria-selected:opacity-100 hover:!rounded-xl',
                ),
              }}
            />
          </PopoverContent>
        </Popover>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  },
);

FormDatePicker.displayName = 'FormDatePicker';
