import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {
    cache: 'force-cache',
  });
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  return (
    // Suspense key 값이 변경될때마다 로딩
    <Suspense key={q || ''} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
