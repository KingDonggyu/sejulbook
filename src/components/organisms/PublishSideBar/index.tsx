import Button from '@/components/atoms/Button';
import SideBar from '@/components/molecules/SideBar';
import { ButtonVariant, ColorVariant } from '@/constants';
import useOpenClose from '@/hooks/useOpenClose';
import * as s from './style';

interface PublishSideBarProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const PublishSideBar = ({ anchorEl, handleClose }: PublishSideBarProps) => (
  <SideBar anchorEl={anchorEl} handleClose={handleClose}>
    <s.Wrapper>
      <div>
        <s.Label>책 표지 사진</s.Label>
      </div>
      <div>
        <s.Label>카테고리</s.Label>
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

const PublishButton = () => {
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
      <PublishSideBar anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

PublishSideBar.Button = PublishButton;

export default PublishSideBar;
