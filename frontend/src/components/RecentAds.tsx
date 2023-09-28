import React, { useEffect, useState } from 'react';
import { AdCard, AdCardProps } from './AdCard';
import axios from 'axios';
import { API_URL } from '@/config';

export const RecentAds = () => {
  const [ads, setAds] = useState<AdCardProps[]>([]);

  const fetchAds = async () => {
    try {
      const result = await axios.get<AdCardProps[]>(API_URL + '/ads');
      setAds(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err, 'error');
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  const addToTotalPrice = (price: number) => {
    const newTotalPrice = price + totalPrice;
    setTotalPrice(newTotalPrice);
  };

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total : {totalPrice} €</p>
      <section className='recent-ads'>
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              title={ad.title}
              picture={ad.picture}
              price={ad.price}
              link={ad.link}
            ></AdCard>
            <button
              className='button'
              onClick={() => addToTotalPrice(ad.price)}
            >
              Add price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
