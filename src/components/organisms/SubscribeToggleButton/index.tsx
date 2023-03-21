import { css } from '@emotion/react';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import { UserId } from '@/types/features/user';
import useSubscribeToggle from '@/hooks/services/mutations/useSubscribeToggle';

const buttonStyle = css`
  align-items: flex-start;
  svg {
    margin-right: 3px;
  }
`;

interface SubscribeToggleButtonProps extends ButtonProps {
  userId: UserId;
  isSubscribed?: boolean;
}

const SubscribeToggleButton = ({
  userId,
  isSubscribed = false,
  ...buttonProps
}: SubscribeToggleButtonProps) => {
  const subscribeToggle = useSubscribeToggle({
    targetUserId: userId,
    isSubscribed,
  });

  return isSubscribed ? (
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.SECONDARY}
      onClick={() => subscribeToggle()}
      css={buttonStyle}
      {...buttonProps}
    >
      구독 취소
    </Button>
  ) : (
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.PRIMARY}
      onClick={() => subscribeToggle()}
      css={buttonStyle}
      {...buttonProps}
    >
      <AiOutlinePlus size={15} />
      구독
    </Button>
  );
};

export default SubscribeToggleButton;
