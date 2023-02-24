import Link from 'next/link';
import Button from '@/components/atoms/Button';
import TextArea, { TextAreaProps } from '@/components/atoms/TextArea';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import Route from '@/constants/routes';
import { Comment } from '@/types/features/comment';
import formatDate from '@/utils/formatDateToKorean';
import * as s from './style';

const CommentItem = ({ writer, content, createdAt }: Comment) => (
  <s.CommentWrapper>
    <s.CommentInfo>
      <Link href={`${Route.LIBRARY}/1`}>{writer}</Link>
      <time>{formatDate(createdAt)}</time>
    </s.CommentInfo>
    <s.CommentContent>{content}</s.CommentContent>
  </s.CommentWrapper>
);

interface CommentContainerProps extends TextAreaProps {
  comments: Comment[];
}

const CommentContainer = ({
  comments,
  ...textAreaProps
}: CommentContainerProps) => (
  <>
    <s.TextAreaWrapper>
      <TextArea
        variant={TextFieldVariant.TEXT}
        placeholder="댓글을 작성하세요."
        {...textAreaProps}
      />
      <Button variant={ButtonVariant.CONTAINED} color={ColorVariant.PRIMARY}>
        등록
      </Button>
    </s.TextAreaWrapper>
    <s.CommentList>
      {comments.map(({ writer, content, createdAt }) => (
        <CommentItem
          key={writer + createdAt}
          writer={writer}
          content={content}
          createdAt={createdAt}
        />
      ))}
    </s.CommentList>
  </>
);

export default CommentContainer;
