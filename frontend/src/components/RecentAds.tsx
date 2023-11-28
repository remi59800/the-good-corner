import React, { useState } from 'react';
import { AdCard, AdType } from './AdCard';
import { queryAllAds } from '@/graphql/queryAllAds';
import { useQuery } from '@apollo/client';

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
};

export const RecentAds = ({ categoryId, searchWord }: RecentAdsProps) => {
  const { data } = useQuery<{ items: AdType[] }>(queryAllAds, {
    variables: {
      where: {
        ...(categoryId ? { categoryIn: [categoryId] } : {}),
        ...(searchWord ? { searchTitle: searchWord } : {}),
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const ads = data ? data.items : [];

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
              category={ad.category}
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
