import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const UserItem = styled.li`
  padding: 30px 0;
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
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Introduce = styled.h3`
  line-height: 1.5;
  padding-top: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const buttonStyle = css`
  width: 70px;
  min-width: 70px;
  padding: 6px;
`;
