'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';
import { PhoneInput, type PhoneInputRefType, type ParsedCountry } from 'react-international-phone';
import { useRef } from 'react';
import 'react-international-phone/style.css';
import { useTranslations } from 'next-intl';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  preventAutocomplete?: boolean;
  phoneInput?: boolean;
  defaultCountry?: string; 
  placeholder?: string;
  type?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  preventAutocomplete,
  phoneInput,
  defaultCountry,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useFormContext();
  const t = useTranslations();

  const inputRef = useRef<PhoneInputRefType | null>(null);
  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
    if (inputRef.current) {
      inputRef.current.state.phone = '';
    }
  };

  const handlePhoneChange = (phone: string, meta: { country: ParsedCountry; inputValue: string }) => {
    const format = meta.country.format as string;
    const expectedLength = (format.match(/\./g) || []).length;
    const cleanedPhone = meta.inputValue.replace(/[^0-9]/g, '');
    
    // if length is correct
    if (cleanedPhone.length === expectedLength) {
      setValue(name, phone, { shouldValidate: false });
      clearErrors(name);
    } else if (!cleanedPhone) {
      setValue(name, '', { shouldValidate: false }); // Reset to empty value
      clearErrors(name); 
    } else {
      setValue(name, phone, { shouldValidate: false });
      // handling error manually
      setError(name, { type: 'manual', message: t('checkout.validation.phone', { amount: expectedLength }) });
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        {phoneInput ? (
          <PhoneInput
            defaultCountry={defaultCountry || 'us'}
            value={value || ''}
            onChange={handlePhoneChange}
            inputClassName="h-12 text-md w-full border border-input bg-background rounded-md px-3"
            countrySelectorStyleProps={{ buttonClassName: 'h-12 text-md border border-input bg-background rounded-md px-3' }}
            ref={inputRef}
            showDisabledDialCodeAndPrefix
            disableDialCodeAndPrefix
            {...props}
          />
        ) : (
          <Input
            className="h-12 text-md"
            {...register(name)}
            {...props}
            autoComplete={preventAutocomplete ? 'new-password' : 'off'}
          />
        )}
        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};