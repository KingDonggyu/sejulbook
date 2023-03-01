import { ForwardedRef, forwardRef } from 'react';
import Image, { ImageProps } from 'next/image';
import styled from '@emotion/styled';
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import { StyleProps } from '@/types/style';
import { searchedItemThumbnailStyle } from '@/styles/common';

const AltThumbnail = styled.div<{ width: number; height: number }>`
  ${({ theme }) => searchedItemThumbnailStyle(theme)};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.COLOR.PRIMARY};
  color: ${({ theme }) => theme.COLOR.PRIMARY};
`;

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
        {...imageProps}
      />
    ) : (
      <AltThumbnail width={width as number} height={height as number}>
        <AiOutlineQuestionCircle size={25} />
      </AltThumbnail>
    ),
);

export default Thumbnail;
