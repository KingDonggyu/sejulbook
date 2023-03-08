import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 10px 20px;
  padding-top: 0;
  width: 500px;
  @media screen and (max-width: 600px) {
    width: 300px;
    padding: 5px;
    padding-top: 0;
  }
`;

export const DraftSavedListLabel = styled.h2`
  margin-bottom: 15px;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const DraftSavedCount = styled.span`
  margin-left: 10px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.NORMAL};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  & > span {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const DraftSavedDetailText = styled.div`
  line-height: 1.5;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const DraftSavedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const DraftSavedItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.HOVER};
`;

export const DraftSavedItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  & > button {
    color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  }
`;

export const DraftSavedDate = styled.time`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const BookName = styled.div`
  text-align: start;
  width: fit-content;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  &:hover {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const ButtonText = styled.div`
  padding: 0 3px;
  color: ${({ theme }) => theme.COLOR.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  & > span {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const AltText = styled.div`
  margin: auto;
  width: fit-content;
  padding: 20px 0;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;
