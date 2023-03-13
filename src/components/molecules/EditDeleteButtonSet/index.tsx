import styled from '@emotion/styled';
import Button from '@/components/atoms/Button';
import { EditIcon, DeleteIcon } from '@/components/atoms/Icon';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

interface EditDeleteButtonSetProps {
  isShowEditButton: boolean;
  isShowDeleteButton: boolean;
  onClickEditButton?: () => void;
  onClickDeleteButton?: () => void;
}

export const EditButton = ({
  isShowEditButton,
  onClickEditButton,
}: Pick<EditDeleteButtonSetProps, 'isShowEditButton' | 'onClickEditButton'>) =>
  isShowEditButton ? (
    <Button onClick={onClickEditButton}>
      <EditIcon size={18} />
    </Button>
  ) : null;

export const DeleteButton = ({
  isShowDeleteButton,
  onClickDeleteButton,
}: Pick<
  EditDeleteButtonSetProps,
  'isShowDeleteButton' | 'onClickDeleteButton'
>) =>
  isShowDeleteButton ? (
    <Button onClick={onClickDeleteButton}>
      <DeleteIcon size={18} />
    </Button>
  ) : null;

const EditDeleteButtonSet = ({
  isShowEditButton,
  isShowDeleteButton,
  onClickEditButton,
  onClickDeleteButton,
}: EditDeleteButtonSetProps) =>
  isShowEditButton || isShowDeleteButton ? (
    <ButtonWrapper>
      <EditButton
        isShowEditButton={isShowEditButton}
        onClickEditButton={onClickEditButton}
      />
      <DeleteButton
        isShowDeleteButton={isShowDeleteButton}
        onClickDeleteButton={onClickDeleteButton}
      />
    </ButtonWrapper>
  ) : null;

export default EditDeleteButtonSet;
