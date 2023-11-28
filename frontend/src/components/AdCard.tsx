import { URL } from '@/config';
import { useRouter } from 'next/router';
import React from 'react';
import { CategoryType } from './Category';

export type AdType = {
  id: number;
  title: string;
  owner: string;
  description: string;
  picture: string;
  location: string;
  price: number;
  category: CategoryType | null;
};

export type AdCardType = Pick<
  AdType,
  'id' | 'title' | 'picture' | 'price' | 'category'
>;

export const AdCard = ({ id, title, picture, price }: AdCardType) => {
  // Afficher les détails d'une offre
  const router = useRouter();
  const displayAdDetails = async () => {
    router.push(`${URL}/ads/${id}`);
  };

  return (
    <div className='ad-card-container' onClick={displayAdDetails}>
      <img
        className='ad-card-image'
        src={picture}
        alt={`Image de ${picture}`}
      />
      <div className='ad-card-text'>
        <div className='ad-card-title'>{title}</div>
        <div className='ad-card-price'>{price} €</div>
      </div>
    </div>
  );
};
