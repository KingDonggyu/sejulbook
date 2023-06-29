import type { Id } from 'bookReview';
import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import { CommentIcon } from '@/components/atoms/Icon';
import LikeButton from '@/components/molecules/LikeButton';
import useLikeStatus from '@/hooks/services/queries/useLikeStatus';
import useLikeToggle from '@/hooks/services/mutations/useLikeToggle';
import * as s from './style';

interface LikeCommentWidgetProps {
  bookReviewId: Id;
  commentCount: number;
  onClickLikeButton?: () => void;
  onClickCommentButton?: () => void;
}

const LikeCommentWidget = ({
  bookReviewId,
  commentCount,
  onClickLikeButton,
  onClickCommentButton,
}: LikeCommentWidgetProps) => {
  const { likeStatus } = useLikeStatus(bookReviewId);
  const likeToggle = useLikeToggle();

  if (!likeStatus) {
    return null;
  }

  const handleClickLikeButton = () => {
    likeToggle({ bookReviewId, isLiked: likeStatus.isLike });
    if (onClickLikeButton) {
      onClickLikeButton();
    }
  };

  return (
    <s.Wrapper>
      <s.Widget>
        <Box radius={30} css={s.boxStyle}>
          <s.WidgetItem>
            <LikeButton
              active={likeStatus.isLike}
              handleClick={handleClickLikeButton}
            />
            <s.Count>{likeStatus.likeCount}</s.Count>
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
