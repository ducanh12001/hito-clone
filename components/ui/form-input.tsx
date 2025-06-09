'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { Input, type InputProps } from '@/components/ui/input';
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
} from '@/components/ui/form';

export interface FormInputProps {
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  showRequiredIcon?: boolean;
}

interface TextInputProps extends FormInputProps {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search';
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
      required,
      className,
      inputClassName,
      labelClassName,
      type = 'text',
      inputProps,
      showRequiredIcon = false,
    },
    ref,
  ) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel
            className={cn('text-sm leading-3.5 font-medium', labelClassName)}
          >
            {label}
            {showRequiredIcon && required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </FormLabel>
        )}
        <FormControl>
          {type === 'password' ? (
            <PasswordInput
              ref={ref}
              className={cn('h-14 text-base', inputClassName)}
              {...(inputProps as PasswordInputProps)}
            />
          ) : (
            <Input
              type={type}
              ref={ref}
              className={cn('h-14 text-base', inputClassName)}
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
