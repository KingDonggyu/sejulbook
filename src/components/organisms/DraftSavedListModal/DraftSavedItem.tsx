import Link from 'next/link';
import type { GetDraftSavedBookReviewResponse } from 'bookReview';
import Button from '@/components/atoms/Button';
import { DeleteIcon } from '@/components/atoms/Icon';
import { ModalKey } from '@/constants/keys';
import Route from '@/constants/routes';
import { confirm } from '@/constants/message';
import modalStore from '@/stores/modalStore';
import formatDateToKorean from '@/utils/formatDateToKorean';
import { iconButtonStyle } from '@/styles/common';
import useBookReviewDeletion from '@/hooks/services/mutations/useBookReviewDeletion';
import * as s from './style';

const DraftSavedItem = ({
  id,
  bookname,
  createdAt,
}: GetDraftSavedBookReviewResponse) => {
  const { closeModal } = modalStore();
  const deleteBookReview = useBookReviewDeletion();

  const handleClickDeleteButton = () => {
    if (window.confirm(confirm.DELETE_DRAFT_SAVED)) {
      deleteBookReview(id);
    }
  };

  return (
    <s.DraftSavedItem key={bookname + createdAt}>
      <s.BookName>
        <Link
          href={{
            pathname: Route.NEWBOOK_WRITE,
            query: { draft: id },
          }}
          onClick={() => closeModal(ModalKey.DRAFT_SAVED_LIST)}
        >
          {bookname}
        </Link>
      </s.BookName>
      <s.DraftSavedItemBottom>
        <s.DraftSavedDate>{formatDateToKorean(createdAt)}</s.DraftSavedDate>
        <Button onClick={handleClickDeleteButton} css={iconButtonStyle}>
          임시저장 삭제
          <DeleteIcon size={17} />
        </Button>
      </s.DraftSavedItemBottom>
    </s.DraftSavedItem>
  );
};

export default DraftSavedItem;
