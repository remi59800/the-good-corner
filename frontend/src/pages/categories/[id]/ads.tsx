import { AdCard, AdCardType } from '@/components/AdCard';
import { API_URL } from '@/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function AdsFromCategory() {
  const [ads, setAds] = useState<AdCardType[]>([]);

  const router = useRouter();
  const categoryId = Number(router.query.id);

  const fetchAdsFromCategory = async () => {
    try {
      const result = await axios.get<AdCardType[]>(
        `${API_URL}/categories/${categoryId}/ads`
      );
      setAds(result.data);
    } catch (err) {
      console.log(err, 'error');
    }
  };

  useEffect(() => {
    fetchAdsFromCategory();
  }, [categoryId]);

  return (
    <section className='recent-ads'>
      {ads.length > 0 ? (
        ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              title={ad.title}
              picture={ad.picture}
              price={ad.price}
            ></AdCard>
          </div>
        ))
      ) : (
        <h3>Pas d'offres dans cette catégorie pour le moment. </h3>
      )}
    </section>
  );
}
