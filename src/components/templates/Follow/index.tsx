import { ReactNode } from 'react';
import * as s from './style';

interface FollowProps {
  isFollowing: boolean;
  myName: string;
  userCount: number;
  userList: ReactNode;
}

const Follow = ({ isFollowing, myName, userCount, userList }: FollowProps) => (
  <s.Wrapper>
    {isFollowing ? (
      <s.Title>
        <span>{myName}</span>님이 구독하는 <span>{userCount}</span>서재
      </s.Title>
    ) : (
      <s.Title>
        <span>{myName}</span>의 서재를 구독하는 <span>{userCount}</span>명
      </s.Title>
    )}
    {userList}
  </s.Wrapper>
);

export default Follow;
