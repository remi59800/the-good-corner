import { API_URL } from '@/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

export type AdCardType = {
  id: number;
  title: string;
  owner?: string;
  description?: string;
  picture: string;
  location?: string;
  price: number;
  category?: { id: number } | null;
};

export const AdCard = ({ id, title, picture, price }: AdCardType) => {
  // Afficher les détails d'une offre
  const router = useRouter();
  const displayAdDetails = async () => {
    router.push(`http://localhost:3000/ads/${id}`);
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
