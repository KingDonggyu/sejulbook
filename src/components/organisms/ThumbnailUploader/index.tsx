import { useEffect } from 'react';
import { toast } from 'react-toastify';
import type { Thumbnail as OriginThumbnail } from 'book';
import Thumbnail from '@/components/atoms/Thumbnail';
import UploadButton from '@/components/molecules/UploadButton';
import Button from '@/components/atoms/Button';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import bookReviewStore from '@/stores/newBookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import { ButtonVariant, ColorVariant } from '@/constants';
import { createS3Object } from '@/lib/s3Client';
import ExceptionBase from '@/lib/HttpErrorException';
import * as s from './style';

interface ThumbnailUploaderProps {
  originThumbnail: OriginThumbnail;
}

const ThumbnailUploader = ({ originThumbnail }: ThumbnailUploaderProps) => {
  const { theme } = useScreenModeContext();
  const { addImageKey } = s3ImageURLStore();

  const {
    bookReview: { thumbnail },
    setThumbnail,
  } = bookReviewStore();

  const handleUpload = async (file: File) => {
    try {
      const url = await createS3Object(file);
      addImageKey(url);
      setThumbnail(url);
    } catch (error) {
      if (error instanceof ExceptionBase) {
        toast.error(error.message);
      }
    }
  };

  const handleClickOriginThumbnailButton = () => {
    setThumbnail(originThumbnail || '');
  };

  useEffect(() => {
    if (!thumbnail) {
      setThumbnail(originThumbnail || '');
    }
  }, [originThumbnail, setThumbnail, thumbnail]);

  return (
    <>
      <Thumbnail
        src={thumbnail}
        alt="책 표지 이미지"
        width={theme.TUMBNAIL.DEFAULT.W}
        height={theme.TUMBNAIL.DEFAULT.H}
        css={s.thumbnailStyle}
      />
      <UploadButton
        variant={ButtonVariant.OUTLINED}
        handleUpload={handleUpload}
        onlyImage
        css={s.buttonStyle}
      />
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.SECONDARY}
        onClick={handleClickOriginThumbnailButton}
        css={s.buttonStyle}
      >
        원본 사진 사용
      </Button>
    </>
  );
};

export default ThumbnailUploader;
