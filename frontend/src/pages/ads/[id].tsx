import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AdCardType } from '@/components/AdCard';
import axios from 'axios';
import { API_URL } from '@/config';

export default function AdDetails() {
  const [ad, setAd] = useState<AdCardType>();

  const router = useRouter();
  const adId = Number(router.query.id);

  const fetchAd = async () => {
    try {
      if (adId) {
        const result = await axios.get<AdCardType>(`${API_URL}/ads/${adId}`);
        setAd(result.data);
      }
    } catch (err) {
      console.log(err, 'error');
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

    router.push(`http://localhost:3000`);
  };

  const updateAd = () => {
    router.push(`http://localhost:3000/ads/new`);
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
