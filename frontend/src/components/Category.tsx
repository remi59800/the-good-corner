import React from 'react';

export type CategoryProps = {
  id: number;
  name: string;
};

export const Category = ({ name }: CategoryProps) => {
  return (
    <>
      <a href='' className='category-navigation-link'>
        {name}
      </a>
    </>
  );
};
