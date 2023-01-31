import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

export const Title = styled.h1`
  margin: auto;
  margin-bottom: 30px;
  width: fit-content;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const HiddenWrapper = styled.div`
  margin: 20px 0;
`;
