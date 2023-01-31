import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

export const HiddenWrapper = styled.div`
  margin: 20px 0;
`;

export const BookSelectText = styled.div`
  padding-bottom: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;
