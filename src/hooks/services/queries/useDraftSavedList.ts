import useQuery from '@/hooks/useQuery';
import { getDraftSavedListQuery } from '@/services/queries/bookReview';
import { DraftSavedBookReview } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

const useDraftSavedList = (myId: UserId) => {
  const { data: draftSavedList } = useQuery<DraftSavedBookReview[]>(
    getDraftSavedListQuery(Number(myId)),
  );

  return draftSavedList;
};

export default useDraftSavedList;
