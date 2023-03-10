import styled from '@emotion/styled';

export const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 270px;
  height: 100%;
  padding: 10px;
  padding-bottom: 30px;
`;

export const PublishInfoItem = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const ExplainText = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 10px;
  & > button {
    width: 100%;
  }
`;
