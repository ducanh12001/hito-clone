'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  showRequiredIcon?: boolean;
  placeholder?: string;
  options: readonly SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

export const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      label,
      description,
      required = false,
      className,
      labelClassName,
      inputClassName,
      showRequiredIcon = false,
      placeholder = '選択してください',
      options,
      value,
      onValueChange,
      disabled = false,
      name,
    },
    ref,
  ) => {
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
        <Select onValueChange={onValueChange} value={value} disabled={disabled}>
          <FormControl>
            <SelectTrigger
              ref={ref}
              className={cn(
                'bg-background w-full cursor-pointer text-base data-[size=default]:h-12',
                !value && 'text-muted-foreground',
                inputClassName,
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  },
);

FormSelect.displayName = 'FormSelect';
