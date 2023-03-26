import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 10px;
  height: 80vh;
  width: ${({ theme }) => theme.MAX_WIDTH.MOBILE};
  overflow-x: hidden;
  overflow-y: auto;

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    width: 300px;
  }
`;

export const Title = styled.h1`
  line-height: 1.5;
  text-align: center;
  padding-bottom: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  & > span:first-of-type {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
  & > span:last-of-type {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const UserItem = styled.li`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const ProfileWrapper = styled.div`
  overflow: hidden;
`;

export const Name = styled.h2`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
`;

export const Introduce = styled.h3`
  line-height: 1.5;
  padding-top: 7px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IntersectTarget = styled.div`
  height: 1px;
`;

export const buttonStyle = (theme: Theme) => css`
  width: 70px;
  min-width: 70px;
  padding: 6px;
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
`;
