import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import TextArea, { TextAreaProps } from '@/components/atoms/TextArea';
import EditDeleteButtonSet from '@/components/molecules/EditDeleteButtonSet';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import Route from '@/constants/routes';
import {
  CommentDeleteRequest,
  CommentRequest,
  CommentResponse,
} from '@/types/features/comment';
import formatDate from '@/utils/formatDateToKorean';
import useUser from '@/hooks/services/queries/useUser';
import useCommentCreation from '@/hooks/services/mutations/useCommentCreation';
import useCommentDeletion from '@/hooks/services/mutations/useCommentDeletion';
import useUserStatus from '@/hooks/useUserStatus';
import { UserId } from '@/types/features/user';
import * as s from './style';

type CommentContainerProps = {
  isMyBookReview: boolean;
  comments: CommentResponse[];
} & Pick<CommentRequest, 'bookReviewId'> &
  TextAreaProps;

type CommentItemProps = {
  onClickDeleteButton: () => void;
} & Omit<CommentResponse, 'id' | 'bookReviewId'> &
  Pick<CommentContainerProps, 'isMyBookReview'> & {
    myId?: UserId;
  };

const CommentItem = ({
  myId,
  commenterId,
  content,
  createdAt,
  isMyBookReview,
  onClickDeleteButton,
}: CommentItemProps) => {
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
          onClickDeleteButton={onClickDeleteButton}
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
  const [writingContent, setWritingContent] = useState('');
  const myId = session ? session.id || undefined : undefined;

  const addComment = useCommentCreation({
    bookReviewId,
    content: writingContent,
  });

  const deleteComment = useCommentDeletion({ bookReviewId });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWritingContent(e.target.value);
  };

  const handleClickAddButton = () => {
    addComment();
    setWritingContent('');
  };

  const handleClickDeleteButton = ({
    id,
  }: Pick<CommentDeleteRequest, 'id'>) => {
    if (window.confirm('댓글을 정말 삭제하시겠습니까?')) {
      deleteComment({ id });
    }
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
      {Boolean(comments.length) && (
        <s.CommentList>
          {comments.map(({ id, commenterId, content, createdAt }) => (
            <CommentItem
              key={id}
              myId={myId}
              commenterId={commenterId}
              content={content}
              createdAt={createdAt}
              isMyBookReview={isMyBookReview}
              onClickDeleteButton={() => handleClickDeleteButton({ id })}
            />
          ))}
        </s.CommentList>
      )}
    </>
  );
};

export default CommentContainer;
