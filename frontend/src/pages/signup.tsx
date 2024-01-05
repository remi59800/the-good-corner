import { mutationSignup } from '@/graphql/mutationSignup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const [doSignUp, { error }] = useMutation(mutationSignup);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await doSignUp({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      if (data.item) {
        router.replace('/signin');
      }
    } catch {}
  };

  return (
    <main className='main-content'>
      {error && (
        <p>
          Une erreur est survenur - Compte déjà existant ou mot de passe trop
          faible
        </p>
      )}
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
        <button type='submit'>Enregistrement</button>
      </form>
    </main>
  );
}
