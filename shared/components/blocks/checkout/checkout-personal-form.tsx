import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

interface Props {
  className?: string;
  t: (t: string) => string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className, t }) => {

  return (
    <WhiteBlock title={t('personalData.title')} className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder={t('personalData.firstName')} />
        <FormInput name="lastName" className="text-base" placeholder={t('personalData.lastName')} />
        <FormInput name="email" className="text-base" placeholder={t('personalData.email')} />
        <FormInput
          name="phone"
          className="text-base"
          placeholder={t('personalData.phone')}
          phoneInput
        />
      </div>
    </WhiteBlock>
  );
};