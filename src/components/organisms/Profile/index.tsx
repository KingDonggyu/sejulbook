import Link from 'next/link';
import useUser from '@/hooks/services/queries/useUser';
import { UserId } from '@/types/features/user';
import * as s from './style';

const Profile = ({ userId }: { userId: UserId }) => {
  const user = useUser(userId);

  return (
    <s.Wrapper>
      <s.Title>
        <span>{user.name}</span>의 서재
      </s.Title>
      <s.Introduce>{user.introduce}</s.Introduce>
      <s.DetailWrapper>
        <s.DatailItem>
          <span>읽은 책</span>
          <em>3</em>
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
