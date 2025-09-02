import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostPageProps) {
  const { slug } = await params;
  const userId = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPosts({ searchText: '', page: 1, ...(userId !== 'All' && { userId }) }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={userId} />
    </HydrationBoundary>
  );
}
