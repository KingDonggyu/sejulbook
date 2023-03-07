import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Thumbnail from '@/components/atoms/Thumbnail';
import UploadButton from '@/components/molecules/UploadButton';
import Button from '@/components/atoms/Button';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import { ButtonVariant, ColorVariant } from '@/constants';
import { BookThumbnail } from '@/types/features/book';
import { uploadLocalImage } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import * as s from './style';

interface ThumbnailUploaderProps {
  originThumbnail: BookThumbnail;
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
      const url = await uploadLocalImage(file);
      addImageKey(url);
      setThumbnail(url);
    } catch (error) {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
    }
  };

  const handleClickOriginThumbnailButton = () => {
    setThumbnail(originThumbnail);
  };

  useEffect(() => {
    setThumbnail(originThumbnail);
  }, [originThumbnail, setThumbnail]);

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
