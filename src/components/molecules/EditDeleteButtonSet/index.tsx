import styled from '@emotion/styled';
import Button from '@/components/atoms/Button';
import { EditIcon, DeleteIcon } from '@/components/atoms/Icon';
import { iconButtonStyle } from '@/styles/common';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  button {
    ${iconButtonStyle}
  }
`;

interface EditDeleteButtonSetProps {
  size?: number;
  isShowEditButton: boolean;
  isShowDeleteButton: boolean;
  onClickEditButton?: () => void;
  onClickDeleteButton?: () => void;
}

export const EditButton = ({
  size,
  isShowEditButton,
  onClickEditButton,
}: Pick<
  EditDeleteButtonSetProps,
  'size' | 'isShowEditButton' | 'onClickEditButton'
>) =>
  isShowEditButton ? (
    <Button onClick={onClickEditButton}>
      독후감 수정
      <EditIcon size={size || 18} />
    </Button>
  ) : null;

export const DeleteButton = ({
  size,
  isShowDeleteButton,
  onClickDeleteButton,
}: Pick<
  EditDeleteButtonSetProps,
  'size' | 'isShowDeleteButton' | 'onClickDeleteButton'
>) =>
  isShowDeleteButton ? (
    <Button onClick={onClickDeleteButton}>
      독후감 삭제
      <DeleteIcon size={size || 18} />
    </Button>
  ) : null;

const EditDeleteButtonSet = ({
  size,
  isShowEditButton,
  isShowDeleteButton,
  onClickEditButton,
  onClickDeleteButton,
}: EditDeleteButtonSetProps) =>
  isShowEditButton || isShowDeleteButton ? (
    <ButtonWrapper>
      <EditButton
        size={size}
        isShowEditButton={isShowEditButton}
        onClickEditButton={onClickEditButton}
      />
      <DeleteButton
        size={size}
        isShowDeleteButton={isShowDeleteButton}
        onClickDeleteButton={onClickDeleteButton}
      />
    </ButtonWrapper>
  ) : null;

export default EditDeleteButtonSet;
