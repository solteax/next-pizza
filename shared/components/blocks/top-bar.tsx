"use client"

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { Categories } from './categories';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
  className?: string;
}

export const  TopBar: React.FC<Props> = ({ categories, className }) => {
  return(
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 overflow-x-auto whitespace-nowrap', className)}>
      <Container className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0 ">
        <Categories items={categories} />
      </Container>
    </div>
  )

};
