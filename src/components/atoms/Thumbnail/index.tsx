import { ForwardedRef, forwardRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import type { StyleProps } from '@emotion/react';
import getS3DomainAddress from '@/utils/getS3DomainAddress';
import * as s from './style';

type ExtendedImageProps =
  | ImageProps
  | (Omit<ImageProps, 'src'> & { src: undefined });

export type ThumbnailProps = ExtendedImageProps & StyleProps;

const Thumbnail = forwardRef(
  (
    { src, width, height, ...imageProps }: ThumbnailProps,
    ref: ForwardedRef<HTMLImageElement>,
  ) => {
    const s3DomainAddress = getS3DomainAddress();
    const unoptimized = !src?.toString().startsWith(s3DomainAddress);

    return src ? (
      <Image
        priority
        ref={ref}
        src={src}
        width={width}
        height={height}
        unoptimized={unoptimized}
        css={s.thumbnailStyle}
        {...imageProps}
      />
    ) : (
      <s.AltThumbnail width={width as number} height={height as number}>
        <AiOutlineQuestionCircle size={25} />
      </s.AltThumbnail>
    );
  },
);

export default Thumbnail;
