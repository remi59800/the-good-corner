import { mutationSignin } from '@/graphql/mutationSignin';
import { queryMe } from '@/graphql/queryMe';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState(false);

  const router = useRouter();

  const [doSignin, { error }] = useMutation(mutationSignin, {
    refetchQueries: [queryMe],
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFailed(false);
    try {
      const { data } = await doSignin({
        variables: {
          email,
          password,
        },
      });

      if (data.item) {
        router.replace('/');
      } else {
        setFailed(true);
      }
    } catch {}
  };

  return (
    <main className='main-content'>
      {error && <p>Une erreur est survenue</p>}
      {failed && <p>Identifiants incorrects</p>}
      <form onSubmit={onSubmit} autoComplete='off'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='e-mail'
          autoComplete='off'
        ></input>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Mot de passe'
          autoComplete='off'
        ></input>
        <button type='submit'>Connexion</button>
      </form>
    </main>
  );
}
