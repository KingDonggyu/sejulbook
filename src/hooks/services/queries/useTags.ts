import type { BookReviewId, GetTagResponse } from 'tag';
import type { Query } from '@/lib/react-query/types/query';
import useQuery from '@/lib/react-query/hooks/useQuery';
import TagRepository from '@/repository/api/TagRepository';

export const getTagsQuery = (
  bookReviewId?: BookReviewId,
): Query<GetTagResponse[]> => ({
  queryKey: ['tag_get', bookReviewId],
  queryFn: () => (bookReviewId ? new TagRepository().get(bookReviewId) : []),
});

const useTags = (bookReviewId?: BookReviewId) => {
  const { data: tags, isLoading } = useQuery<GetTagResponse[]>(
    getTagsQuery(bookReviewId),
  );

  return { tags, isLoading };
};

export default useTags;
