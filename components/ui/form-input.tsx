'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { Input, InputProps } from '@/components/ui/input';
import {
  PasswordInput,
  PasswordInputProps,
} from '@/components/ui/password-input';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/components/ui/form';
import { Badge } from './badge';

export interface FormInputProps {
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  showRequiredIcon?: boolean;
  badge?: React.ReactNode;
}

interface TextInputProps extends FormInputProps {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date-picker';
  inputProps?: Omit<InputProps, 'type'>;
}

interface PasswordFieldProps extends FormInputProps {
  type: 'password';
  inputProps?: PasswordInputProps;
}

type FormInputFieldProps = TextInputProps | PasswordFieldProps;

const FormInputField = React.forwardRef<HTMLInputElement, FormInputFieldProps>(
  (
    {
      label,
      description,
      required = false,
      className,
      inputClassName,
      labelClassName,
      type = 'text',
      inputProps,
      showRequiredIcon = false,
      badge,
    },
    ref,
  ) => {
    const { error } = useFormField();

    return (
      <FormItem className={className}>
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
            {badge}
          </FormLabel>
        )}
        <FormControl>
          {type === 'password' ? (
            <PasswordInput
              ref={ref}
              required={required}
              error={!!error}
              className={cn(
                'h-14 text-base font-medium placeholder:font-normal',
                inputClassName,
              )}
              {...(inputProps as PasswordInputProps)}
            />
          ) : (
            <Input
              type={type}
              ref={ref}
              required={required}
              error={!!error}
              className={cn(
                'h-14 text-base font-medium placeholder:font-normal',
                inputClassName,
              )}
              {...(inputProps as InputProps)}
            />
          )}
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  },
);

FormInputField.displayName = 'FormInputField';

export { FormInputField };
