import { toast } from 'react-toastify';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import { bookReviewSussess, userError } from '@/constants/message';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import useUserStatus from '@/hooks/useUserStatus';
import { draftSaveBookReview } from '@/services/api/bookReview';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import Route from '@/constants/routes';
import { DraftSavedBookReviewURLQuery } from '@/types/features/bookReview';
import getInlineURL from '@/utils/getInlineURL';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const { session, isLogin } = useUserStatus();
  const { savedBookReviewId, setSavedBookReviewId } = useSavedBookReviewId();

  const { bookReview } = bookReviewStore();
  const { emptyImageKeySet } = s3ImageURLStore();

  const handleClick = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return;
    }

    const bookReviewId = await draftSaveBookReview({
      userId: session.id,
      bookReviewId: savedBookReviewId,
      bookReview,
    });

    emptyImageKeySet();
    setSavedBookReviewId(bookReviewId);
    toast.success(bookReviewSussess.DRAFT_SAVE);

    if (!savedBookReviewId) {
      const query: DraftSavedBookReviewURLQuery = {
        draft: bookReviewId,
      };
      const url = getInlineURL({ baseURL: Route.NEWBOOK_WRITE, query });
      window.history.replaceState(null, '', url);
    }
  };

  return (
    <Button
      variant={ButtonVariant.OUTLINED}
      onClick={handleClick}
      {...buttonProps}
    >
      임시저장
    </Button>
  );
};

export default DraftSaveButton;
