import React from 'react';
import Link from 'next/link';

export type CategoryType = {
  id: number;
  name: string;
};

export const Category = ({ id, name }: CategoryType) => {
  return (
    <Link href={`/categories/${id}`} className='category-navigation-link'>
      {name}
    </Link>
  );
};
