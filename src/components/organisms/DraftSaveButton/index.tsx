import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import { bookReviewSussess, userError } from '@/constants/message';
import useUserStatus from '@/hooks/useUserStatus';
import { draftSaveBookReview } from '@/services/api/bookReview';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import { toast } from 'react-toastify';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const { session, isLogin } = useUserStatus();
  const { bookReview } = bookReviewStore();
  const { emptyImageKeySet } = s3ImageURLStore();

  const handleClick = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return;
    }

    emptyImageKeySet();
    await draftSaveBookReview({ bookReview, userId: session.id });
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
