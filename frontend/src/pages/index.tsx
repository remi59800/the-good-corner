import { Layout } from '@/components/Layout';
import { RecentAds } from '@/components/RecentAds';

export default function Home() {
  return (
    <Layout title='Home'>
      <main className='main-content'>
        <RecentAds />
      </main>
    </Layout>
  );
}
