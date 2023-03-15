import Button, { ButtonProps } from '@/components/atoms/Button';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import { DraftSavedBookReview } from '@/types/features/bookReview';
import DraftSavedItem from './DraftSavedItem';
import * as s from './style';

interface DraftSavedListModalProps
  extends Omit<ModalProps, 'modalKey' | 'children'> {
  draftSavedList: DraftSavedBookReview[];
}

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
