import { ChangeEvent, useState } from 'react';
import type { Id } from 'bookReview';
import type { GetCommentResponse } from 'comment';
import Button from '@/components/atoms/Button';
import TextArea, { TextAreaProps } from '@/components/atoms/TextArea';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import useCommentCreation from '@/hooks/services/mutations/useCommentCreation';
import useUserStatus from '@/hooks/useUserStatus';
import CommentItem from './CommentItem';
import * as s from './style';

interface CommentContainerProps extends TextAreaProps {
  isMyBookReview: boolean;
  bookReviewId: Id;
  comments: GetCommentResponse[];
}

const CommentContainer = ({
  comments,
  bookReviewId,
  isMyBookReview,
  ...textAreaProps
}: CommentContainerProps) => {
  const { session } = useUserStatus();
  const [content, setContent] = useState('');
  const myUserId = session ? session.id || undefined : undefined;

  const addComment = useCommentCreation({
    onSuccess: () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleClickAddButton = () => {
    addComment({ bookReviewId, content });
    setContent('');
  };

  return (
    <>
      <s.TextAreaWrapper>
        <TextArea
          variant={TextFieldVariant.TEXT}
          placeholder="댓글을 작성하세요."
          value={content}
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
