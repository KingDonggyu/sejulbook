import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const thumbnailStyle = css`
  object-fit: cover;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h2`
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const Author = styled.h3`
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const Rating = styled.div`
  display: flex;
  gap: 3px;
`;

export const Date = styled.p`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;
