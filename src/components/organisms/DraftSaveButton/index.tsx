import { useState } from 'react';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import Route from '@/constants/routes';
import {
  BookReviewId,
  DraftSavedBookReviewURLQuery,
} from '@/types/features/bookReview';
import getInlineURL from '@/utils/getInlineURL';
import useBookReviewDraftSave from '@/hooks/services/mutations/useBookReviewDraftSave';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const { savedBookReviewId, setSavedBookReviewId } = useSavedBookReviewId();

  const { bookReview } = bookReviewStore();
  const { emptyImageKeySet } = s3ImageURLStore();

  const [isPossibleSave, setIsPossibleSave] = useState(true);

  const chageURL = (bookReviewId: BookReviewId) => {
    if (savedBookReviewId) {
      return;
    }

    const query: DraftSavedBookReviewURLQuery = {
      draft: bookReviewId,
    };
    const url = getInlineURL({ baseURL: Route.NEWBOOK_WRITE, query });

    window.history.replaceState(null, '', url);
  };

  const handleSuccess = (bookReviewId: BookReviewId) => {
    emptyImageKeySet();
    chageURL(bookReviewId);
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
