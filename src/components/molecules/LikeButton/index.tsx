import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import Button from '@/components/atoms/Button';
import { lightTheme as theme } from '@/styles/theme';
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
    {active ? (
      <>
        <FaHeart size={size} color={theme.COLOR.RUBY} />
        좋아요 취소
      </>
    ) : (
      <>
        <FaRegHeart size={size} color={theme.COLOR.RUBY} />
        좋아요
      </>
    )}
  </Button>
);

export default LikeButton;
