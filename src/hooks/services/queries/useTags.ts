import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import TagRepository from '@/repository/api/TagRepository';

type Response = Awaited<ReturnType<TagRepository['get']>>;

export const getTagsQuery = (bookReviewId: number): Query<Response> => ({
  queryKey: ['tag_get', bookReviewId],
  queryFn: () => new TagRepository().get(bookReviewId),
});

const useTags = (bookReviewId: number) => {
  const { data: tags, isLoading } = useQuery<Response>(
    getTagsQuery(bookReviewId),
  );

  return { tags, isLoading };
};

export default useTags;
