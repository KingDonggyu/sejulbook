import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import TextArea, { TextAreaProps } from '@/components/atoms/TextArea';
import EditDeleteButtonSet from '@/components/molecules/EditDeleteButtonSet';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import Route from '@/constants/routes';
import { CommentRequest, CommentResponse } from '@/types/features/comment';
import formatDate from '@/utils/formatDateToKorean';
import useUser from '@/hooks/services/queries/useUser';
import useCommentCreation from '@/hooks/services/mutations/useCommentCreation';
import useUserStatus from '@/hooks/useUserStatus';
import { UserId } from '@/types/features/user';
import * as s from './style';

type CommentContainerProps = {
  isMyBookReview: boolean;
  comments: CommentResponse[];
} & Pick<CommentRequest, 'bookReviewId'> &
  TextAreaProps;

const CommentItem = ({
  myId,
  commenterId,
  content,
  createdAt,
  isMyBookReview,
}: Omit<CommentResponse, 'bookReviewId'> &
  Pick<CommentContainerProps, 'isMyBookReview'> & {
    myId?: UserId;
  }) => {
  const user = useUser(commenterId);
  const isMyComment = !!(myId && myId === commenterId);

  return (
    <s.CommentWrapper>
      <s.CommentInfo>
        <Link href={`${Route.LIBRARY}/${commenterId}`}>
          {user && user.name}
        </Link>
        <time>{formatDate(createdAt)}</time>
      </s.CommentInfo>
      <s.CommentContent>{content}</s.CommentContent>
      <s.ButtonWrapper>
        <EditDeleteButtonSet
          size={13}
          isShowEditButton={isMyComment}
          isShowDeleteButton={isMyComment || isMyBookReview}
        />
      </s.ButtonWrapper>
    </s.CommentWrapper>
  );
};

const CommentContainer = ({
  comments,
  bookReviewId,
  isMyBookReview,
  ...textAreaProps
}: CommentContainerProps) => {
  const { session } = useUserStatus();
  const myId = session ? session.id || undefined : undefined;

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
              myId={myId}
              commenterId={commenterId}
              content={content}
              createdAt={createdAt}
              isMyBookReview={isMyBookReview}
            />
          ))}
        </s.CommentList>
      )}
    </>
  );
};

export default CommentContainer;
