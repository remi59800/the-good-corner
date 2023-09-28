import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { AdCardProps } from '@/components/AdCard';
import axios from 'axios';
import { API_URL } from '@/config';

export default function AdDetails() {
  const [ad, setAd] = useState<AdCardProps>();

  const router = useRouter();
  const adId = Number(router.query.id);

  const fetchAd = async () => {
    try {
      if (adId) {
        const result = await axios.get<AdCardProps>(`${API_URL}/ads/${adId}`);
        setAd(result.data);
      }
    } catch (err) {
      console.log(err, 'error');
    }
  };

  useEffect(() => {
    fetchAd();
  }, [adId]);

  return (
    <Layout title='Ad'>
      <main className='main-content'>
        {ad && (
          <div className='ad-card-container'>
            <a className='ad-card-link' href={ad.link}>
              <img className='ad-card-image' src={ad.picture} />
              <div className='ad-card-text'>
                <div className='ad-card-title'>{ad.title}</div>
                <div className='ad-card-price'>{ad.price}</div>
              </div>
            </a>
          </div>
        )}
      </main>
    </Layout>
  );
}
