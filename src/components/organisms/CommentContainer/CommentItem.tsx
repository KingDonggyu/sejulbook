import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { CommentResponse } from '@/types/features/comment';
import { ButtonVariant, ColorVariant, TextFieldVariant } from '@/constants';
import Route from '@/constants/routes';
import { confirm } from '@/constants/message';
import formatDateToKorean from '@/utils/formatDateToKorean';
import TextArea from '@/components/atoms/TextArea';
import Button from '@/components/atoms/Button';
import EditDeleteButtonSet from '@/components/molecules/EditDeleteButtonSet';
import useUser from '@/hooks/services/queries/useUser';
import useCommentDeletion from '@/hooks/services/mutations/useCommentDeletion';
import useCommentEdit from '@/hooks/services/mutations/useCommentEdit';
import * as s from './style';

interface CommentItemProps {
  commentInfo: CommentResponse;
  isEditable: boolean;
  isRemovable: boolean;
}

const CommentItem = ({
  commentInfo: { id, bookReviewId, commenterId, content, createdAt },
  isEditable,
  isRemovable,
}: CommentItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const commenter = useUser(commenterId);
  const deleteComment = useCommentDeletion({ bookReviewId });
  const updateComment = useCommentEdit({ bookReviewId });

  const handleChangeEditContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleClickDeleteButton = () => {
    if (window.confirm(confirm.DELETE_COMMENT)) {
      deleteComment({ id });
    }
  };

  const handleClickEditButton = () => {
    setEditedContent(content);
    setIsEditMode(true);
  };

  const handleClickEditCompleteButton = () => {
    if (content !== editedContent) {
      updateComment({ id, content: editedContent });
    }
    setIsEditMode(false);
  };

  return (
    <s.CommentWrapper>
      <s.CommentInfo>
        <Link href={`/${commenterId}${Route.LIBRARY}`}>
          {commenter && commenter.name}
        </Link>
        <time>{formatDateToKorean(createdAt)}</time>
      </s.CommentInfo>
      {isEditMode ? (
        <>
          <TextArea
            value={editedContent}
            onChange={handleChangeEditContent}
            variant={TextFieldVariant.OUTLINED}
            css={s.editTextAreaStyle}
          />
          <s.ButtonWrapper>
            <Button
              onClick={handleClickEditCompleteButton}
              variant={ButtonVariant.TEXT}
              color={ColorVariant.PRIMARY}
            >
              완료
            </Button>
            <Button
              onClick={() => setIsEditMode(false)}
              variant={ButtonVariant.TEXT}
              color={ColorVariant.SECONDARY}
            >
              취소
            </Button>
          </s.ButtonWrapper>
        </>
      ) : (
        <>
          <s.CommentContent>{content}</s.CommentContent>
          <s.ButtonWrapper>
            <EditDeleteButtonSet
              size={13}
              isShowEditButton={isEditable}
              isShowDeleteButton={isRemovable}
              onClickEditButton={handleClickEditButton}
              onClickDeleteButton={handleClickDeleteButton}
            />
          </s.ButtonWrapper>
        </>
      )}
    </s.CommentWrapper>
  );
};

export default CommentItem;
