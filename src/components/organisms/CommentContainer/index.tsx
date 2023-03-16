import { ChangeEvent, useState } from 'react';
import Button from '@/components/atoms/Button';
import TextArea, { TextAreaProps } from '@/components/atoms/TextArea';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import { CommentRequest, CommentResponse } from '@/types/features/comment';
import useCommentCreation from '@/hooks/services/mutations/useCommentCreation';
import useUserStatus from '@/hooks/useUserStatus';
import CommentItem from './CommentItem';
import * as s from './style';

type CommentContainerProps = {
  isMyBookReview: boolean;
  comments: CommentResponse[];
} & Pick<CommentRequest, 'bookReviewId'> &
  TextAreaProps;

const CommentContainer = ({
  comments,
  bookReviewId,
  isMyBookReview,
  ...textAreaProps
}: CommentContainerProps) => {
  const { session } = useUserStatus();
  const [writingContent, setWritingContent] = useState('');
  const myUserId = session ? session.id || undefined : undefined;

  const addComment = useCommentCreation({
    bookReviewId,
    content: writingContent,
    onSuccess: () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWritingContent(e.target.value);
  };

  const handleClickAddButton = () => {
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
          onClick={handleClickAddButton}
        >
          등록
        </Button>
      </s.TextAreaWrapper>
      {!!comments.length && (
        <s.CommentList>
          {comments.map((commentInfo) => {
            const isMyComment = !!(
              myUserId && myUserId === commentInfo.commenterId
            );
            return (
              <CommentItem
                key={commentInfo.id}
                commentInfo={commentInfo}
                isEditable={isMyComment}
                isRemovable={isMyComment || isMyBookReview}
              />
            );
          })}
        </s.CommentList>
      )}
    </>
  );
};

export default CommentContainer;
