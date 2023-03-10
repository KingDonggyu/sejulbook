import { useState } from 'react';
import { toast } from 'react-toastify';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import { bookReviewSussess, userError } from '@/constants/message';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import useUserStatus from '@/hooks/useUserStatus';
import { draftSaveBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import Route from '@/constants/routes';
import {
  BookReviewId,
  DraftSavedBookReviewURLQuery,
} from '@/types/features/bookReview';
import getInlineURL from '@/utils/getInlineURL';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => {
  const { session, isLogin } = useUserStatus();
  const { savedBookReviewId, setSavedBookReviewId } = useSavedBookReviewId();

  const { bookReview } = bookReviewStore();
  const { emptyImageKeySet } = s3ImageURLStore();

  const [isPossibleSave, isSetPossibleSave] = useState(true);

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

  const handleClick = async () => {
    if (!isPossibleSave) {
      return;
    }

    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return;
    }

    isSetPossibleSave(false);

    try {
      const bookReviewId = await draftSaveBookReview({
        userId: session.id,
        bookReviewId: savedBookReviewId,
        bookReview,
      });

      emptyImageKeySet();
      chageURL(bookReviewId);
      setSavedBookReviewId(bookReviewId);
      toast.success(bookReviewSussess.DRAFT_SAVE);
    } catch (error) {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
    } finally {
      isSetPossibleSave(true);
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
