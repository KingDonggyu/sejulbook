import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import { CommentIcon } from '@/components/atoms/Icon';
import LikeButton from '@/components/molecules/LikeButton';
import * as s from './style';

interface LikeCommentWidgetProps {
  handleClickLikeButton: () => void;
  handleClickCommentButton: () => void;
}

const LikeCommentWidget = ({
  handleClickLikeButton,
  handleClickCommentButton,
}: LikeCommentWidgetProps) => (
  <s.Wrapper>
    <s.Widget>
      <Box radius={30} css={s.boxStyle}>
        <s.WidgetItem>
          <LikeButton handleClick={handleClickLikeButton} />
          <s.Count>13</s.Count>
        </s.WidgetItem>
        <s.WidgetItem>
          <Button css={s.buttonStyle} onClick={handleClickCommentButton}>
            <CommentIcon />
            댓글
          </Button>
          <s.Count>3</s.Count>
        </s.WidgetItem>
      </Box>
    </s.Widget>
  </s.Wrapper>
);

export default LikeCommentWidget;
