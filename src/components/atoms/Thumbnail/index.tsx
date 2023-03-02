import { ForwardedRef, forwardRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import { StyleProps } from '@/types/style';
import * as s from './style';

type ExtendedImageProps =
  | ImageProps
  | (Omit<ImageProps, 'src'> & { src: undefined });

type ThumbnailProps = ExtendedImageProps & StyleProps;

const Thumbnail = forwardRef(
  (
    { src, width, height, ...imageProps }: ThumbnailProps,
    ref: ForwardedRef<HTMLImageElement>,
  ) =>
    src ? (
      <Image
        ref={ref}
        src={src}
        width={width}
        height={height}
        css={s.thumbnailStyle}
        {...imageProps}
      />
    ) : (
      <s.AltThumbnail width={width as number} height={height as number}>
        <AiOutlineQuestionCircle size={25} />
      </s.AltThumbnail>
    ),
);

export default Thumbnail;
