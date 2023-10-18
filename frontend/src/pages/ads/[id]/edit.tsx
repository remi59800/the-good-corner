import { AdType } from '@/components/AdCard';
import { AdForm } from '@/components/AdForm';
import { API_URL } from '@/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function NewAd() {
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

  return <main className='main-content'>{ad && <AdForm ad={ad} />}</main>;
}
