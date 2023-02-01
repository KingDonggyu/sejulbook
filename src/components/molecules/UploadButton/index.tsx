import { ChangeEvent, useRef } from 'react';
import { css, Theme } from '@emotion/react';
import Button from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';
import { StyleProps } from '@/types/style';

const buttonStyle = (theme: Theme) => css`
  border: 1px solid ${theme.COLOR.LINE};
`;

type UploadButtonProps = {
  handleUpload: (file: File) => void;
  onlyImage: boolean;
} & StyleProps;

const UploadButton = ({
  handleUpload,
  onlyImage = false,
  ...styleProps
}: UploadButtonProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClickButton = () => {
    fileRef.current?.click();
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.item(0);
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileRef}
        accept={onlyImage ? 'image/*' : undefined}
        style={{ display: 'none' }}
        onChange={handleChangeFile}
      />
      <Button
        variant={ButtonVariant.OUTLINED}
        css={buttonStyle}
        onClick={handleClickButton}
        {...styleProps}
      >
        파일 업로드
      </Button>
    </>
  );
};

export default UploadButton;
