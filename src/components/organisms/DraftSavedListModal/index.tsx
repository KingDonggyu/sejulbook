import Button from '@/components/atoms/Button';
import { DeleteIcon } from '@/components/atoms/Icon';
import Modal from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import * as s from './style';

const data = [
  { bookname: '브레이킹 루틴', createdAt: '2023.02.11' },
  { bookname: '없던 오늘', createdAt: '2023.02.08' },
  {
    bookname: '나는 주니어 개발자다(사람과 프로그래머 11)',
    createdAt: '2022.12.25',
  },
  { bookname: '브레이킹 루틴', createdAt: '2023.02.11' },
  { bookname: '없던 오늘', createdAt: '2023.02.08' },
  {
    bookname: '나는 주니어 개발자다(사람과 프로그래머 11)',
    createdAt: '2022.12.25',
  },
  { bookname: '브레이킹 루틴', createdAt: '2023.02.11' },
  { bookname: '없던 오늘', createdAt: '2023.02.08' },
  {
    bookname: '나는 주니어 개발자다(사람과 프로그래머 11)',
    createdAt: '2022.12.25',
  },
  { bookname: '브레이킹 루틴', createdAt: '2023.02.11' },
];

const DraftSavedListModal = () => (
  <Modal modalKey={ModalKey.DRAFT_SAVED_LIST}>
    <s.Wrapper>
      <s.DraftSavedListLabel>
        임시저장 독후감
        <s.DraftSavedCount>
          총 <span>{data.length}</span>개
        </s.DraftSavedCount>
      </s.DraftSavedListLabel>
      <s.DraftSavedDetailText>
        * 최대 10개의 독후감을 임시저장할 수 있으며 90일간 보관됩니다.
      </s.DraftSavedDetailText>
      {Boolean(!data.length) && (
        <s.AltText>임시저장된 독후감이 없습니다.</s.AltText>
      )}
      <s.DraftSavedList>
        {data.map(({ bookname, createdAt }) => (
          <s.DraftSavedItem key={bookname + createdAt}>
            <Button>
              <s.BookName>{bookname}</s.BookName>
            </Button>
            <s.DraftSavedItemBottom>
              <s.DraftSavedDate>{createdAt}</s.DraftSavedDate>
              <Button
                onClick={() =>
                  window.confirm('임시저장 독후감을 정말 삭제하시겠습니까?')
                }
              >
                <DeleteIcon size={17} />
              </Button>
            </s.DraftSavedItemBottom>
          </s.DraftSavedItem>
        ))}
      </s.DraftSavedList>
    </s.Wrapper>
  </Modal>
);

const DraftSavedListModalButton = () => {
  const { openModal } = modalStore();

  return (
    <>
      <Button
        radius={15}
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.LINE}
        onClick={() => openModal(ModalKey.DRAFT_SAVED_LIST)}
      >
        <s.ButtonText>
          임시저장 독후감 <span>10</span>
        </s.ButtonText>
      </Button>
      <DraftSavedListModal />
    </>
  );
};

DraftSavedListModal.Button = DraftSavedListModalButton;

export default DraftSavedListModal;
