import Button from '@/components/atoms/Button';
import SideBar from '@/components/molecules/SideBar';
import ThumbnailUploader from '@/components/organisms/ThumbnailUploader';
import CategoryModal from '@/components/organisms/CategoryModal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import useOpenClose from '@/hooks/useOpenClose';
import { Book } from '@/types/domain/book';
import * as s from './style';

interface PublishSideBarProps {
  newbook: Book;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const PublishSideBar = ({
  newbook,
  anchorEl,
  handleClose,
}: PublishSideBarProps) => (
  <SideBar anchorEl={anchorEl} handleClose={handleClose}>
    <s.Wrapper>
      <div>
        <s.Label>책 표지 사진</s.Label>
        <s.ExplainText>* 대표 이미지로 사용됩니다.</s.ExplainText>
        <ThumbnailUploader thumbnail={newbook.thumbnail} />
      </div>
      <div>
        <s.Label>카테고리</s.Label>
        <CategoryModal.Button handleClickCategory={() => {}} />
      </div>
      <div>
        <s.Label>평점</s.Label>
      </div>
      <div>
        <s.Label>태그</s.Label>
      </div>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.PRIMARY}
        css={s.buttonStyle}
      >
        발행
      </Button>
    </s.Wrapper>
  </SideBar>
);

const PublishButton = ({ newbook }: { newbook: Book }) => {
  const { anchorEl, handleOpen, handleClose } = useOpenClose();

  return (
    <>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.PRIMARY}
        onClick={handleOpen}
      >
        발행
      </Button>
      <PublishSideBar
        newbook={newbook}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
};

PublishSideBar.Button = PublishButton;

export default PublishSideBar;
