import { StyleProps } from '@emotion/react';
import styled from '@emotion/styled';

const SkeletonBox = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  min-width: ${({ width }) => `${width}px`};
  min-height: ${({ height }) => `${height}px`};
  background: ${({ theme }) => theme.COLOR.LINE};
  animation: skeleton-gradient 1.5s infinite ease-in-out;
  @keyframes skeleton-gradient {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.5;
    }
  }
`;

interface SkeletonProps extends StyleProps {
  width?: number;
  height?: number;
}

const Skeleton = ({ width, height, ...styleProps }: SkeletonProps) => (
  <SkeletonBox width={width} height={height} {...styleProps} />
);

export default Skeleton;
