import useQuery from '@/hooks/useQuery';
import { getTagsQuery } from '@/services/queries/bookReview';
import { BookReviewId } from '@/types/features/bookReview';
import { Tag } from '@/types/features/tag';

const useTags = (bookReviewId: BookReviewId) => {
  const { data: tags } = useQuery<Tag[]>(getTagsQuery(bookReviewId));
  return tags;
};

export default useTags;
