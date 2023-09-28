import { AdCard, AdCardProps } from '@/components/AdCard';
import { Layout } from '@/components/Layout';
import { APP_URL } from '@/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function AdsFromCategory() {
  const [ads, setAds] = useState<AdCardProps[]>([]);

  const router = useRouter();
  const categoryId = Number(router.query.id);

  const fetchAdsFromCategory = async () => {
    try {
      console.log(categoryId);
      if (categoryId) {
        console.log(categoryId);
        const result = await axios.get<AdCardProps[]>(
          `${APP_URL}/categories/${categoryId}/ads`
        );

        setAds(result.data);
      }
    } catch (err) {
      console.log(err, 'error');
    }
  };

  useEffect(() => {
    fetchAdsFromCategory();
  }, []);

  return (
    <Layout title='Ad'>
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
          </div>
        ))}
      </section>
    </Layout>
  );
}
