import { ReactNode, useRef } from 'react';
import Link from 'next/link';
import type { Id, Sejul } from 'bookReview';
import Thumbnail, { ThumbnailProps } from '@/components/atoms/Thumbnail';
import Route from '@/constants/routes';
import * as s from './style';

type SejulThumbnailProps = {
  bookReviewId: Id;
  sejul: Sejul;
  isGrayscale?: boolean;
  isLargeSejul?: boolean;
  isHiddenChildrenOnHover?: boolean;
  children?: ReactNode;
} & ThumbnailProps;

const SejulThumbnail = ({
  bookReviewId,
  sejul,
  children,
  isGrayscale = false,
  isLargeSejul = false,
  ...thumbnailProps
}: SejulThumbnailProps) => {
  const thumbnailRef = useRef<HTMLImageElement>(null);

  return (
    <Link href={`${Route.BOOKREVIEW}/${bookReviewId}`}>
      <s.ThumnailWrapper isGrayscale={isGrayscale}>
        <Thumbnail ref={thumbnailRef} {...thumbnailProps} />
        <s.SejulBookReview isLarge={isLargeSejul}>{sejul}</s.SejulBookReview>
        <s.DefaultContent>{children}</s.DefaultContent>
      </s.ThumnailWrapper>
    </Link>
  );
};

export default SejulThumbnail;
