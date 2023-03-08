import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import { userError } from '@/constants/message';
import useUserStatus from '@/hooks/useUserStatus';
import { draftSaveBookReview } from '@/services/api/bookReview';
import bookReviewStore from '@/stores/bookReviewStore';
import { toast } from 'react-toastify';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const { session, isLogin } = useUserStatus();
  const { bookReview } = bookReviewStore();

  const handleClick = async () => {
    if (isLogin) {
      await draftSaveBookReview({ bookReview, userId: session.id });
      toast.success(userError.NOT_LOGGED);
      return;
    }

    toast.error(userError.NOT_LOGGED);
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
