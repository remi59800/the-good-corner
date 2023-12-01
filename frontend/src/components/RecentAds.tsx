import React, { useState } from 'react';
import { AdCard, AdType } from './AdCard';
import { queryAllAds } from '@/graphql/queryAllAds';
import { gql, useQuery } from '@apollo/client';

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
};

export const queryAllAdsCount = gql`
  query AllAdsCount($where: AdsWhere) {
    count: allAdsCount(where: $where)
  }
`;

export const RecentAds = ({ categoryId, searchWord }: RecentAdsProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const addToTotalPrice = (price: number) => {
    const newTotalPrice = price + totalPrice;
    setTotalPrice(newTotalPrice);
  };

  const { data } = useQuery<{ items: AdType[]; count: number }>(queryAllAds, {
    variables: {
      where: {
        ...(categoryId ? { categoryIn: [categoryId] } : {}),
        ...(searchWord ? { searchTitle: searchWord } : {}),
      },
      skip: page * pageSize,
      take: pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });
  const ads = data ? data.items : [];

  const count = data ? data.count : 0;

  const pagesCount = Math.ceil(count / pageSize);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total du panier : {totalPrice} €</p>
      <p>Nombre de résultats par page :</p>
      <button onClick={() => setPageSize(5)}>5</button>
      <button onClick={() => setPageSize(10)}>10</button>
      <button onClick={() => setPageSize(20)}>20</button>
      <br></br>
      <p>
        Page actuelle {page} ; nombre total d'éléments : {count}
      </p>
      <button
        disabled={page === 0}
        onClick={() => setPage(Math.max(page - 1, 0))}
      >
        Précédent
      </button>
      <button
        disabled={page === pagesCount - 1}
        onClick={() => setPage(Math.min(page + 1, pagesCount))}
      >
        Suivant
      </button>
      <br></br>
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
              Ajouter au panier
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
