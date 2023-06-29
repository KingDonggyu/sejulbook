import styled from '@emotion/styled';

export const Wrapper = styled.main`
  margin: auto;
  padding: 7rem 20px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

export const DraftSavedButtonWrapper = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 40px;
`;
