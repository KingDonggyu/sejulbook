import { css } from '@emotion/react';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import { UserId } from '@/types/features/user';
import useSubscribe from '@/hooks/services/mutations/useSubscribe';

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
  const subscribe = useSubscribe({ targetUserId: userId });

  return isSubscribed ? (
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
      onClick={() => subscribe()}
    >
      <AiOutlinePlus size={15} />
      구독
    </Button>
  );
};

export default SubscribeButton;
