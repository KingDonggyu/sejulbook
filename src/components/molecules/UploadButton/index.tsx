import { ChangeEvent, useRef } from 'react';
import Button, { ButtonProps } from '@/components/atoms/Button';
import { ButtonVariant } from '@/constants';

type UploadButtonProps = {
  handleUpload: (file: File) => void;
  onlyImage: boolean;
} & ButtonProps;

const UploadButton = ({
  handleUpload,
  onlyImage = false,
  ...buttonProps
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
        onClick={handleClickButton}
        {...buttonProps}
      >
        파일 업로드
      </Button>
    </>
  );
};

export default UploadButton;
