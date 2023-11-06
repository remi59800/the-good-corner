import { RecentAds } from '@/components/RecentAds';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>();

  useEffect(() => {
    if (typeof router.query.searchWord === 'string') {
      setSearchWord(router.query.searchWord);
    }
  }, [router.query]);

  return (
    <main className='main-content'>
      <RecentAds searchWord={searchWord} />
    </main>
  );
}
