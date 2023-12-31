import { RecentAds } from '@/components/RecentAds';
import { useRouter } from 'next/router';

export default function Category() {
  const router = useRouter();
  const categoryId = Number(router.query.id);

  return (
    <main className='main-content'>
      <RecentAds categoryId={categoryId} />
    </main>
  );
}
