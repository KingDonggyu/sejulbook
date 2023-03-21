import { css } from '@emotion/react';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import { UserId } from '@/types/features/user';
import useSubscribeToggle from '@/hooks/services/mutations/useSubscribeToggle';

const buttonStyle = css`
  align-items: flex-start;
  svg {
    margin-right: 3px;
  }
`;

interface SubscribeButtonProps {
  userId: UserId;
  isSubscribed?: boolean;
}

const SubscribeButton = ({
  userId,
  isSubscribed = false,
}: SubscribeButtonProps) => {
  const subscribeToggle = useSubscribeToggle({
    targetUserId: userId,
    isSubscribed,
  });

  return isSubscribed ? (
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.SECONDARY}
      css={buttonStyle}
      onClick={() => subscribeToggle()}
    >
      구독 취소
    </Button>
  ) : (
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.PRIMARY}
      css={buttonStyle}
      onClick={() => subscribeToggle()}
    >
      <AiOutlinePlus size={15} />
      구독
    </Button>
  );
};

export default SubscribeButton;
