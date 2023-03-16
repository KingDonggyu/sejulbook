import { useRouter } from 'next/router';
import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import { CommentIcon } from '@/components/atoms/Icon';
import LikeButton from '@/components/molecules/LikeButton';
import useLikeStatus from '@/hooks/services/queries/useLike';
import useUserStatus from '@/hooks/useUserStatus';
import useLikeToggle from '@/hooks/services/mutations/useLikeToggle';
import * as s from './style';

interface LikeCommentWidgetProps {
  likeCount: number;
  commentCount: number;
  onClickLikeButton?: () => void;
  onClickCommentButton?: () => void;
}

const LikeCommentWidget = ({
  likeCount,
  commentCount,
  onClickLikeButton,
  onClickCommentButton,
}: LikeCommentWidgetProps) => {
  const router = useRouter();
  const { session, isLogin } = useUserStatus();

  const userId = isLogin ? session.id : undefined;
  const bookReviewId = Number(router.query.id);

  const { isLike } = useLikeStatus({ userId, bookReviewId });
  const likeToggle = useLikeToggle({ isLike, bookReviewId });

  const handleClickLikeButton = () => {
    likeToggle();
    if (onClickLikeButton) {
      onClickLikeButton();
    }
  };

  return (
    <s.Wrapper>
      <s.Widget>
        <Box radius={30} css={s.boxStyle}>
          <s.WidgetItem>
            <LikeButton active={isLike} handleClick={handleClickLikeButton} />
            <s.Count>{likeCount}</s.Count>
          </s.WidgetItem>
          <s.WidgetItem>
            <Button css={s.buttonStyle} onClick={onClickCommentButton}>
              댓글
              <CommentIcon />
            </Button>
            <s.Count>{commentCount}</s.Count>
          </s.WidgetItem>
        </Box>
      </s.Widget>
    </s.Wrapper>
  );
};

export default LikeCommentWidget;
