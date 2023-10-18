/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AdType } from '@/components/AdCard';
import axios from 'axios';
import { API_URL } from '@/config';

export default function AdDetails() {
  const [ad, setAd] = useState<AdType>();

  const router = useRouter();
  const adId = Number(router.query.id);

  const fetchAd = async () => {
    if (adId) {
      const result = await axios.get<AdType>(`${API_URL}/ads/${adId}`);
      setAd(result.data);
    }
  };
  useEffect(() => {
    fetchAd();
  }, [adId]);

  const deleteAd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ad && ad.id) {
      await axios.delete(`${API_URL}/ads/${ad.id}`);
    }

    router.push(API_URL);
  };

  const updateAd = () => {
    if (ad) {
      router.push(`/ads/${ad.id}/edit`);
    }
  };

  return (
    <main className='main-content'>
      {ad && (
        <div className='ad-details-card-container'>
          <img className='ad-details-card-image' src={ad.picture} />
          <div className='ad-details'>
            <div className='ad-card-details-first-infos'>
              <div className='ad-card-detail-title'>{ad.title}</div>
              <div className='ad-card-price'>{ad.price}€</div>
            </div>
            <h3 className='title-description'>Description</h3>
            <p className='description-product'>{ad.description}</p>
            <h4 className='title-localisation'>Localisation</h4>
            <p className='description-localisation'>{ad.location}</p>
          </div>
          <button onClick={updateAd}>Modifier l'offre</button>
          <button onClick={deleteAd}>Supprimer l'offre</button>
        </div>
      )}
    </main>
  );
}
