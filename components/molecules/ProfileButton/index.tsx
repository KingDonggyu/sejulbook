import Button from '@/components/atoms/Button';
import { ButtonVariant } from '@/types/constants';

const ProfileButton = () => (
  <Button variant={ButtonVariant.OUTLINED} style={{ height: '30px' }}>
    시작하기
  </Button>
);

export default ProfileButton;
