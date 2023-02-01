import { useState } from 'react';
import { css, Theme } from '@emotion/react';
import Thumbnail from '@/components/atoms/Thumbnail';
import UploadButton from '@/components/molecules/UploadButton';
import { lightTheme } from '@/styles/theme';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';

const thumbnailStyle = (theme: Theme) => css`
  object-fit: cover;
  margin-bottom: 10px;
  border: 1px solid ${theme.COLOR.LINE};
`;

const buttonStyle = (theme: Theme) => css`
  margin-top: 5px;
  width: ${theme.TUMBNAIL.DEFAULT.W}px;
  border-color: ${theme.COLOR.LINE};
`;

const ImageUploader = () => {
  const [imageFile, setImageFIle] = useState<File | null>(null);
  const handleUpload = (file: File) => {
    setImageFIle(file);
  };

  return (
    <>
      {imageFile && (
        <Thumbnail
          src={URL.createObjectURL(imageFile)}
          alt="책 표지 이미지"
          width={lightTheme.TUMBNAIL.DEFAULT.W}
          height={lightTheme.TUMBNAIL.DEFAULT.H}
          css={thumbnailStyle}
        />
      )}
      <UploadButton
        variant={ButtonVariant.OUTLINED}
        handleUpload={handleUpload}
        onlyImage
        css={buttonStyle}
      />
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.SECONDARY}
        css={buttonStyle}
      >
        원본 사진 사용
      </Button>
    </>
  );
};

export default ImageUploader;
