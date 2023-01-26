import { css, Theme } from '@emotion/react';
import { ButtonVariant, ColorVariant } from '@/constants';
import Button from '@/components/atoms/Button';

const editProfileButtonStyle = (theme: Theme) => css`
  padding: 5px 8px;
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
`;

const ProfileEditButton = () => (
  <Button
    variant={ButtonVariant.OUTLINED}
    color={ColorVariant.PRIMARY}
    css={editProfileButtonStyle}
  >
    프로필 편집
  </Button>
);

export default ProfileEditButton;
