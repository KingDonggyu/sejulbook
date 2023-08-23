import { useEffect } from 'react';
import type { Thumbnail as OriginThumbnail } from 'book';
import Thumbnail from '@/components/atoms/Thumbnail';
import UploadButton from '@/components/molecules/UploadButton';
import Button from '@/components/atoms/Button';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import bookReviewStore from '@/stores/newBookReviewStore';
import { ButtonVariant, ColorVariant } from '@/constants';
import useLocalImageUploader from '@/hooks/useLocalImageUploader';
import * as s from './style';

interface ThumbnailUploaderProps {
  originThumbnail: OriginThumbnail;
}

const ThumbnailUploader = ({ originThumbnail }: ThumbnailUploaderProps) => {
  const { theme } = useScreenModeContext();
  const uploadLocalImage = useLocalImageUploader();

  const {
    bookReview: { thumbnail },
    setThumbnail,
  } = bookReviewStore();

  const handleUpload = async (file: File) => {
    const url = await uploadLocalImage(file);
    setThumbnail(url);
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
