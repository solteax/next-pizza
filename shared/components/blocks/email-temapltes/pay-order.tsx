import React from 'react';

interface Props {
  messageTitle: string;
  paymentMessage: React.ReactNode;
}

export const PayOrderTemplate: React.FC<Props> = ({ messageTitle, paymentMessage }) => {
  return (
    <div>
      <h1>{messageTitle}</h1>

      <p>{paymentMessage}</p>
    </div>
  )
}
