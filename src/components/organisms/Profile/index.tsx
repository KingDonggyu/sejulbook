import Link from 'next/link';
import useUser from '@/hooks/services/queries/useUser';
import { UserId } from '@/types/features/user';
import * as s from './style';

interface ProfileProps {
  userId: UserId;
  bookReviewCount: number;
}

const Profile = ({ userId, bookReviewCount }: ProfileProps) => {
  const user = useUser(userId);

  if (!user) {
    return null;
  }

  return (
    <s.Wrapper>
      <s.Title>
        <span>{user.name}</span>의 서재
      </s.Title>
      {user.introduce && <s.Introduce>{user.introduce}</s.Introduce>}
      <s.DetailWrapper>
        <s.DatailItem>
          <span>읽은 책</span>
          <em>{bookReviewCount}</em>
        </s.DatailItem>
        <s.DatailItem>
          <Link href="/">
            <span>구독자</span>
            <em>17</em>
          </Link>
        </s.DatailItem>
        <s.DatailItem>
          <Link href="/">
            <span>관심서재</span>
            <em>4</em>
          </Link>
        </s.DatailItem>
      </s.DetailWrapper>
    </s.Wrapper>
  );
};

export default Profile;
