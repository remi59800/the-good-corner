import { useRouter } from 'next/router';
import React from 'react';
import { AdType } from '@/components/AdCard';
import { URL } from '@/config';
import { useMutation, useQuery } from '@apollo/client';
import { mutationDeleteAd } from '@/graphql/mutationDeleteAd';
import { queryAd } from '@/graphql/queryAd';
import { queryAllAds } from '@/graphql/queryAllAds';

export default function AdDetails() {
  const router = useRouter();
  const adId = Number(router.query.id);

  const { data } = useQuery<{ item: AdType }>(queryAd, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;

  //Delete d'une ad
  const [doDelete] = useMutation(mutationDeleteAd, {
    refetchQueries: [queryAllAds],
  });

  const deleteAd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await doDelete({
      variables: {
        id: adId,
      },
    });
    router.push(URL);
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
