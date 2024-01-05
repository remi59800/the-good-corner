import { AdForm } from '@/components/AdForm';
import { queryAd } from '@/graphql/queryAd';
import { AdType } from '@/types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

export default function NewAd() {
  const router = useRouter();
  const adId = Number(router.query.id);

  const { data } = useQuery<{ item: AdType }>(queryAd, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;

  return <main className='main-content'>{ad && <AdForm ad={ad} />}</main>;
}
