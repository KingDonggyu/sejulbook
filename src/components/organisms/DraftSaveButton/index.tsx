import { useState } from 'react';
import { useRouter } from 'next/router';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import Route from '@/constants/routes';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import useBookReviewDraftSave from '@/hooks/services/mutations/useBookReviewDraftSave';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import {
  BookReviewId,
  DraftSavedBookReviewURLQuery,
} from '@/types/features/bookReview';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const router = useRouter();
  const { savedBookReviewId, setSavedBookReviewId } = useSavedBookReviewId();

  const { bookReview } = bookReviewStore();
  const { emptyImageKeySet } = s3ImageURLStore();

  const [isPossibleSave, setIsPossibleSave] = useState(true);

  const replaceURL = (bookReviewId: BookReviewId) => {
    if (savedBookReviewId) {
      return;
    }

    const query: DraftSavedBookReviewURLQuery = {
      draft: bookReviewId,
    };

    router.replace({
      pathname: Route.NEWBOOK_WRITE,
      query,
    });
  };

  const handleSuccess = (bookReviewId: BookReviewId) => {
    emptyImageKeySet();
    replaceURL(bookReviewId);
    setSavedBookReviewId(bookReviewId);
    setIsPossibleSave(true);
  };

  const draftSaveBookReview = useBookReviewDraftSave({
    bookReview,
    savedBookReviewId,
    onSuccess: handleSuccess,
    onError: () => setIsPossibleSave(true),
  });

  const handleClick = async () => {
    if (!isPossibleSave) {
      return;
    }
    setIsPossibleSave(false);
    draftSaveBookReview();
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
