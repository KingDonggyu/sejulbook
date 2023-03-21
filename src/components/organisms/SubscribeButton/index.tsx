import { css } from '@emotion/react';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';

const buttonStyle = css`
  align-items: flex-start;
  svg {
    margin-right: 3px;
  }
`;

interface SubscribeButtonProps {
  isSubscribed?: boolean;
}

const SubscribeButton = ({ isSubscribed = false }: SubscribeButtonProps) =>
  isSubscribed ? (
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.SECONDARY}
      css={buttonStyle}
    >
      구독 취소
    </Button>
  ) : (
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.PRIMARY}
      css={buttonStyle}
    >
      <AiOutlinePlus size={15} />
      구독
    </Button>
  );

export default SubscribeButton;
