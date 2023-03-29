import styled from '@emotion/styled';

export const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
`;

export const TagName = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const TagCount = styled.div`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;
