import Link from 'next/link';
import Route from '@/constants/routes';
import { User } from '@/types/features/user';
import { FollowInfoResponse } from '@/types/features/follow';
import useUserStatus from '@/hooks/useUserStatus';
import useIntersect from '@/hooks/useIntersect';
import SubscribeToggleButton from '../SubscribeToggleButton';
import * as s from './style';

interface UserListProps {
  userList: (User & Pick<FollowInfoResponse, 'isFollow'>)[];
  fetchMoreUserList: () => void;
}

const UserList = ({ userList, fetchMoreUserList }: UserListProps) => {
  const { session, isLogin } = useUserStatus();

  const intersectRef = useIntersect(() => {
    fetchMoreUserList();
  });

  return (
    <ul>
      {userList.map(({ id, name, introduce, isFollow }) => (
        <s.UserItem key={id}>
          <s.ProfileWrapper>
            <Link href={`${Route.LIBRARY}/${id}`}>
              <s.Name>{name}</s.Name>
            </Link>
            {!!introduce && <s.Introduce>{introduce}</s.Introduce>}
          </s.ProfileWrapper>
          {isLogin && session.id !== id && (
            <SubscribeToggleButton
              userId={id}
              isSubscribed={isFollow}
              css={s.buttonStyle}
            />
          )}
        </s.UserItem>
      ))}
      <s.IntersectTarget ref={intersectRef} />
    </ul>
  );
};

export default UserList;
