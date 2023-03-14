import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import TextArea, { TextAreaProps } from '@/components/atoms/TextArea';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import Route from '@/constants/routes';
import { CommentRequest, CommentResponse } from '@/types/features/comment';
import formatDate from '@/utils/formatDateToKorean';
import useUser from '@/hooks/services/queries/useUser';
import useCommentCreation from '@/hooks/services/mutations/useCommentCreation';
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

type CommentContainerProps = {
  comments: CommentResponse[];
} & Pick<CommentRequest, 'bookReviewId'> &
  TextAreaProps;

const CommentContainer = ({
  comments,
  bookReviewId,
  ...textAreaProps
}: CommentContainerProps) => {
  const [writingContent, setWritingContent] = useState('');
  const addComment = useCommentCreation({
    bookReviewId,
    content: writingContent,
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWritingContent(e.target.value);
  };

  const handleClick = () => {
    addComment();
    setWritingContent('');
  };

  return (
    <>
      <s.TextAreaWrapper>
        <TextArea
          variant={TextFieldVariant.TEXT}
          placeholder="댓글을 작성하세요."
          value={writingContent}
          onChange={handleChange}
          {...textAreaProps}
        />
        <Button
          variant={ButtonVariant.CONTAINED}
          color={ColorVariant.PRIMARY}
          onClick={handleClick}
        >
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
};

export default CommentContainer;
