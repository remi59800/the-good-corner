import React from 'react';
import Link from 'next/link';
import { CategoryType } from '@/types';

export const Category = ({ id, name }: CategoryType) => {
  return (
    <Link href={`/categories/${id}`} className='category-navigation-link'>
      {name}
    </Link>
  );
};
