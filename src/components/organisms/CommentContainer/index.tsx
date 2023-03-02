import Link from 'next/link';
import Button from '@/components/atoms/Button';
import TextArea, { TextAreaProps } from '@/components/atoms/TextArea';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import Route from '@/constants/routes';
import { CommentResponse } from '@/types/features/comment';
import formatDate from '@/utils/formatDateToKorean';
import useUser from '@/hooks/services/queries/useUser';
import * as s from './style';

const CommentItem = ({
  commenterId,
  content,
  createdAt,
}: Omit<CommentResponse, 'bookReviewId'>) => {
  const user = useUser(commenterId);

  return (
    <s.CommentWrapper>
      <s.CommentInfo>
        <Link href={`${Route.LIBRARY}/${commenterId}`}>
          {user && user.name}
        </Link>
        <time>{formatDate(createdAt)}</time>
      </s.CommentInfo>
      <s.CommentContent>{content}</s.CommentContent>
    </s.CommentWrapper>
  );
};

interface CommentContainerProps extends TextAreaProps {
  comments: CommentResponse[];
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
    {Boolean(comments.length) && (
      <s.CommentList>
        {comments.map(({ commenterId, content, createdAt }) => (
          <CommentItem
            key={createdAt}
            commenterId={commenterId}
            content={content}
            createdAt={createdAt}
          />
        ))}
      </s.CommentList>
    )}
  </>
);

export default CommentContainer;
