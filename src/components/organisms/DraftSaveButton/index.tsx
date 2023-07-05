import { useRouter } from 'next/router';
import type { Id } from 'bookReview';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import Route from '@/constants/routes';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import useBookReviewDraftSave from '@/hooks/services/mutations/useBookReviewDraftSave';
import useBookReviewEdit from '@/hooks/services/mutations/useBookReviewEdit';
import bookReviewStore from '@/stores/newBookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import { getBookReviewToPublish } from '@/utils/bookReviewDataConverter';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const router = useRouter();
  const { savedBookReviewId, setSavedBookReviewId } = useSavedBookReviewId();

  const { bookReview } = bookReviewStore();
  const { emptyImageKeySet } = s3ImageURLStore();

  const handleSuccess = (bookReviewId?: Id) => {
    emptyImageKeySet();
    if (bookReviewId) {
      router.replace({
        pathname: Route.NEWBOOK_WRITE,
        query: { draft: bookReviewId },
      });
      setSavedBookReviewId(bookReviewId);
    }
  };

  const draftSaveBookReview = useBookReviewDraftSave({
    onSuccess: handleSuccess,
  });

  const redraftSaveBookReivew = useBookReviewEdit({
    onSuccess: handleSuccess,
  });

  const handleClick = () => {
    if (savedBookReviewId) {
      redraftSaveBookReivew({
        bookReview: {
          ...bookReview,
          id: savedBookReviewId,
          categoryId: bookReview.category.id,
        },
        isPublished: false,
      });
      return;
    }
    draftSaveBookReview(getBookReviewToPublish(bookReview));
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
