import { toast } from 'react-toastify';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import { bookReviewSussess, userError } from '@/constants/message';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import useUserStatus from '@/hooks/useUserStatus';
import {
  draftSaveBookReview,
  updateDraftSaveBookReview,
} from '@/services/api/bookReview';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const { session, isLogin } = useUserStatus();
  const savedBookReviewId = useSavedBookReviewId();
  const { bookReview } = bookReviewStore();
  const { emptyImageKeySet } = s3ImageURLStore();

  const handleClick = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return;
    }

    if (savedBookReviewId) {
      await updateDraftSaveBookReview({
        bookReview: {
          ...bookReview,
          id: savedBookReviewId,
        },
        userId: session.id,
      });
    } else {
      await draftSaveBookReview({ bookReview, userId: session.id });
    }

    emptyImageKeySet();
    toast.success(bookReviewSussess.DRAFT_SAVE);
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
