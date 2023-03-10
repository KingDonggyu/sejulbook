import Link from 'next/link';
import { toast } from 'react-toastify';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { DeleteIcon } from '@/components/atoms/Icon';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import { userError } from '@/constants/message';
import Route from '@/constants/routes';
import useUserStatus from '@/hooks/useUserStatus';
import modalStore from '@/stores/modalStore';
import formatDateToKorean from '@/utils/formatDateToKorean';
import { deleteBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import {
  DraftSavedBookReview,
  DraftSavedBookReviewURLQuery,
} from '@/types/features/bookReview';
import * as s from './style';

interface DraftSavedListModalProps
  extends Omit<ModalProps, 'modalKey' | 'children'> {
  draftSavedList: DraftSavedBookReview[];
}

const DraftSavedItem = ({ id, bookname, createdAt }: DraftSavedBookReview) => {
  const { session, isLogin } = useUserStatus();
  const { closeModal } = modalStore();

  const draftSavedURLQuery: DraftSavedBookReviewURLQuery = {
    draft: id,
  };

  const handleClickDeleteButton = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return;
    }

    if (!window.confirm('임시저장 독후감을 정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteBookReview({ userId: session.id, bookReviewId: id });
    } catch (error) {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <s.DraftSavedItem key={bookname + createdAt}>
      <s.BookName>
        <Link
          href={{
            pathname: Route.NEWBOOK_WRITE,
            query: draftSavedURLQuery,
          }}
          onClick={() => closeModal(ModalKey.DRAFT_SAVED_LIST)}
        >
          {bookname}
        </Link>
      </s.BookName>
      <s.DraftSavedItemBottom>
        <s.DraftSavedDate>{formatDateToKorean(createdAt)}</s.DraftSavedDate>
        <Button onClick={handleClickDeleteButton}>
          <DeleteIcon size={17} />
        </Button>
      </s.DraftSavedItemBottom>
    </s.DraftSavedItem>
  );
};

const DraftSavedListModal = ({
  draftSavedList,
  ...modalProps
}: DraftSavedListModalProps) => (
  <Modal {...modalProps} modalKey={ModalKey.DRAFT_SAVED_LIST}>
    <s.Wrapper>
      <s.DraftSavedListLabel>
        임시저장 독후감
        <s.DraftSavedCount>
          총 <span>{draftSavedList.length}</span>개
        </s.DraftSavedCount>
      </s.DraftSavedListLabel>
      <s.DraftSavedDetailText>
        * 최대 10개의 독후감을 임시저장할 수 있으며 90일간 보관됩니다.
      </s.DraftSavedDetailText>
      {Boolean(!draftSavedList.length) && (
        <s.AltText>임시저장된 독후감이 없습니다.</s.AltText>
      )}
      <s.DraftSavedList>
        {draftSavedList.map(({ id, bookname, createdAt }) => (
          <DraftSavedItem
            key={id}
            id={id}
            bookname={bookname}
            createdAt={createdAt}
          />
        ))}
      </s.DraftSavedList>
    </s.Wrapper>
  </Modal>
);

interface DraftSavedListModalButtonProps extends ButtonProps {
  draftSavedList: DraftSavedBookReview[];
}

const DraftSavedListModalButton = ({
  draftSavedList,
  ...buttonProps
}: DraftSavedListModalButtonProps) => {
  const { openModal } = modalStore();

  return (
    <>
      <Button
        radius={15}
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.LINE}
        onClick={() => openModal(ModalKey.DRAFT_SAVED_LIST)}
        {...buttonProps}
      >
        <s.ButtonText>
          임시저장 독후감 <span>{draftSavedList.length}</span>
        </s.ButtonText>
      </Button>
      <DraftSavedListModal draftSavedList={draftSavedList} />
    </>
  );
};

DraftSavedListModal.Button = DraftSavedListModalButton;

export default DraftSavedListModal;
