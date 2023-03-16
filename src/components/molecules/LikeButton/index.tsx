import Button from '@/components/atoms/Button';
import { HeartIcon } from '@/components/atoms/Icon';
import { iconButtonStyle } from '@/styles/common';

interface LikeButtonProps {
  size?: number;
  active?: boolean;
  handleClick?: () => void;
}

const LikeButton = ({
  size,
  active = false,
  handleClick: handleClickLikeButton,
}: LikeButtonProps) => (
  <Button css={iconButtonStyle} onClick={handleClickLikeButton}>
    {active ? '좋아요 취소' : '좋아요'}
    <HeartIcon size={size} active={active} />
  </Button>
);

export default LikeButton;
