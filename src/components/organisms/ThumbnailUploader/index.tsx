import { useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';
import Thumbnail from '@/components/atoms/Thumbnail';
import UploadButton from '@/components/molecules/UploadButton';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import { BookThumbnail } from '@/types/domain/book';
import { lightTheme } from '@/styles/theme';

const thumbnailStyle = (theme: Theme) => css`
  object-fit: cover;
  border: 1px solid ${theme.COLOR.LINE};
`;

const buttonStyle = (theme: Theme) => css`
  margin-top: 5px;
  width: ${theme.TUMBNAIL.DEFAULT.W}px;
  border-color: ${theme.COLOR.LINE};
`;

interface ThumbnailUploaderProps {
  thumbnail: BookThumbnail;
  handleChangeThumbnail: (thumbnail: BookThumbnail) => void;
}

const ThumbnailUploader = ({
  thumbnail: originThumbnail,
  handleChangeThumbnail,
}: ThumbnailUploaderProps) => {
  const [imageSrc, setImageSrc] = useState(originThumbnail);

  const handleUpload = (file: File) => {
    const newImageSrc = URL.createObjectURL(file);
    setImageSrc(newImageSrc);
    handleChangeThumbnail(newImageSrc);
  };

  const handleClickOriginThumbnailButton = () => {
    setImageSrc(originThumbnail);
    handleChangeThumbnail(originThumbnail);
  };

  useEffect(() => {
    setImageSrc(originThumbnail);
  }, [originThumbnail]);

  return (
    <>
      <Thumbnail
        src={imageSrc}
        alt="책 표지 이미지"
        width={lightTheme.TUMBNAIL.DEFAULT.W}
        height={lightTheme.TUMBNAIL.DEFAULT.H}
        css={thumbnailStyle}
      />
      <UploadButton
        variant={ButtonVariant.OUTLINED}
        handleUpload={handleUpload}
        onlyImage
        css={buttonStyle}
      />
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.SECONDARY}
        onClick={handleClickOriginThumbnailButton}
        css={buttonStyle}
      >
        원본 사진 사용
      </Button>
    </>
  );
};

export default ThumbnailUploader;
