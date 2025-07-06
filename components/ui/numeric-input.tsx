'use client';

import { ChangeEvent } from 'react';

import { numberInputSanitize } from '@/lib/utils';
import { FormInputField } from '@/components/ui/form-input';

interface NumericInputProps {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name: string;
  maxLength?: number;
  autoComplete?: string;
  showRequiredIcon?: boolean;
}

export const NumericInput = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  maxLength,
  autoComplete,
  showRequiredIcon,
}: NumericInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = numberInputSanitize(inputValue);

    const finalValue = maxLength
      ? numericValue.slice(0, maxLength)
      : numericValue;
    onChange(finalValue);
  };

  return (
    <FormInputField
      label={label}
      type="tel"
      required={required}
      showRequiredIcon={showRequiredIcon}
      inputProps={{
        placeholder,
        value,
        onChange: handleChange,
        onBlur,
        name,
        maxLength,
        inputMode: 'numeric',
        pattern: '[0-9]*',
        autoComplete,
      }}
    />
  );
};
