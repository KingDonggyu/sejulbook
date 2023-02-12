import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';

const DraftSaveButton = ({ ...buttonProps }: ButtonProps) => (
  <Button variant={ButtonVariant.OUTLINED} {...buttonProps}>
    임시저장
  </Button>
);

export default DraftSaveButton;
