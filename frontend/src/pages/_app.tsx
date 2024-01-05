import { Layout } from '@/components/Layout';
import { queryMe } from '@/graphql/queryMe';
import '@/styles/globals.css';
import { UserType } from '@/types';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  useQuery,
} from '@apollo/client';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const link = createHttpLink({
  uri: 'http://localhost:3001',
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const publicPages = ['/', '/signin', '/signup', '/ads/[id]'];

function Auth(props: { children: React.ReactNode }) {
  const { data, loading } = useQuery<{ item: UserType | null }>(queryMe);
  const router = useRouter();

  useEffect(() => {
    if (publicPages.includes(router.pathname) === false) {
      if (!data?.item) {
        router.replace('/signin');
      }
    }
  }, [router, data]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (publicPages.includes(router.pathname) === false && !data?.item) {
    return <p>Redirection...</p>;
  }

  return props.children;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
