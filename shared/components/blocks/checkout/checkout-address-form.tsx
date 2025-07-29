'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props {
  className?: string;
  t: (t: string) => string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className, t }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title={t('deliveryAddress.title')} className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput
                onChange={(address) => {
                  field.onChange(address);
                }}
                value={field.value}
              />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder={t('deliveryAddress.comment')}
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
