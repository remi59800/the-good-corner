import React from 'react';
import Link from 'next/link';

export type CategoryProps = {
  id: number;
  name: string;
};

export const Category = ({ id, name }: CategoryProps) => {
  return (
    <Link href={`/categories/${id}/ads`} className='category-navigation-link'>
      {name}
    </Link>
  );
};
