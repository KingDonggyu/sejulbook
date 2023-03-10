import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

export const DraftSavedButtonWrapper = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 40px;
`;
