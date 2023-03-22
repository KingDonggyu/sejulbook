import Link from 'next/link';
import Route from '@/constants/routes';
import { User } from '@/types/features/user';
import { FollowInfoResponse } from '@/types/features/follow';
import SubscribeToggleButton from '../SubscribeToggleButton';
import * as s from './style';

interface UserListProps {
  userList: (User & Pick<FollowInfoResponse, 'isFollow'>)[];
}

const UserList = ({ userList }: UserListProps) => (
  <ul>
    {userList.map(({ id, name, introduce, isFollow }) => (
      <s.UserItem key={id}>
        <s.ProfileWrapper>
          <Link href={`${Route.LIBRARY}/${id}`}>
            <s.Name>{name}</s.Name>
          </Link>
          {!!introduce && <s.Introduce>{introduce}</s.Introduce>}
        </s.ProfileWrapper>
        <SubscribeToggleButton
          userId={id}
          isSubscribed={isFollow}
          css={s.buttonStyle}
        />
      </s.UserItem>
    ))}
  </ul>
);

export default UserList;
