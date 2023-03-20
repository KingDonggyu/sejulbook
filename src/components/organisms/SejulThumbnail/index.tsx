import { ReactNode, useEffect, useRef, useState } from 'react';
import Thumbnail, { ThumbnailProps } from '@/components/atoms/Thumbnail';
import { Sejul } from '@/types/features/bookReview';
import * as s from './style';

type SejulThumbnailProps = {
  sejul: Sejul;
  defaultFilter?: string;
  isHiddenChildren?: boolean;
  children?: ReactNode;
} & ThumbnailProps;

const SejulThumbnail = ({
  sejul,
  children,
  defaultFilter = 'none',
  isHiddenChildren = false,
  ...thumbnailProps
}: SejulThumbnailProps) => {
  const thumbnailRef = useRef<HTMLImageElement>(null);
  const [isShowSejul, setIsShowSejul] = useState(false);

  const handleMouseEnterThumbnail = () => {
    setIsShowSejul(true);
    if (thumbnailRef.current) {
      thumbnailRef.current.style.filter = 'brightness(0.3)';
    }
  };

  const handleMouseLeaveThumbnail = () => {
    setIsShowSejul(false);
    if (thumbnailRef.current) {
      thumbnailRef.current.style.filter = defaultFilter;
    }
  };

  useEffect(() => {
    if (thumbnailRef.current) {
      thumbnailRef.current.style.filter = defaultFilter;
    }
  }, [defaultFilter]);

  return (
    <s.ThumnailWrapper
      onMouseEnter={handleMouseEnterThumbnail}
      onMouseLeave={handleMouseLeaveThumbnail}
    >
      <Thumbnail ref={thumbnailRef} {...thumbnailProps} />
      {isShowSejul && <s.SejulBookReview>{sejul}</s.SejulBookReview>}
      {isHiddenChildren ? !isShowSejul && children : children}
    </s.ThumnailWrapper>
  );
};

export default SejulThumbnail;
