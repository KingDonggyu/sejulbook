import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import * as s from './style';

interface DeleteProps {
  isAgree: boolean;
  onClickAgreeCheckBox: () => void;
  onClickDeleteButton: () => void;
}

const Delete = ({
  isAgree,
  onClickAgreeCheckBox,
  onClickDeleteButton,
}: DeleteProps) => (
  <s.Wrapper>
    <s.Title>세 줄 독후감 탈퇴하기</s.Title>
    <s.Description>
      <span>탈퇴하시면 이용 중인 서재가 폐쇄되며,</span>
      <span>
        <strong>모든 데이터는 복구가 불가능합니다.</strong>
      </span>
      <span>신중하게 결정해 주세요.</span>
    </s.Description>
    <Box>
      <s.WarningText>
        서재, 독후감, 댓글 등 모든 정보가 영구 삭제되는 것에 동의합니다.
        <Button
          variant={ButtonVariant.OUTLINED}
          color={ColorVariant.SECONDARY}
          css={s.checkButtonStyle}
          onClick={onClickAgreeCheckBox}
        >
          <s.CheckBox>{isAgree && '✓'}</s.CheckBox>
        </Button>
      </s.WarningText>
    </Box>
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.PRIMARY}
      onClick={onClickDeleteButton}
    >
      탈퇴하기
    </Button>
  </s.Wrapper>
);

export default Delete;
