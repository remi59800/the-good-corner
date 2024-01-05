import { queryMe } from '@/graphql/queryMe';
import { UserType } from '@/types';
import { useQuery } from '@apollo/client';
import React from 'react';

export default function Me() {
  // to use to get current user
  const { data: meData } = useQuery<{ item: UserType | null }>(queryMe);
  const connectedUser = meData?.item;
  return (
    <main className='main-content'>
      <p>Mon adresse e-mail est : {connectedUser?.email}</p>
    </main>
  );
}
