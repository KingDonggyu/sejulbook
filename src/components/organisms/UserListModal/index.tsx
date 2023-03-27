import Link from 'next/link';
import Route from '@/constants/routes';
import { ModalKey } from '@/constants/keys';
import { UserId } from '@/types/features/user';
import useUserStatus from '@/hooks/useUserStatus';
import useIntersect from '@/hooks/useIntersect';
import useUser from '@/hooks/services/queries/useUser';
import useFollowInfo from '@/hooks/services/queries/useFollowInfo';
import useInfinityFollowUserList from '@/hooks/services/queries/useInfinityFollowUserList';
import Modal from '@/components/molecules/Modal';
import SubscribeToggleButton from '../SubscribeToggleButton';
import * as s from './style';

interface UserListProps {
  userId: UserId;
  isFollowing: boolean;
  modalKey: ModalKey.FOLLOWER_USER_LIST | ModalKey.FOLLOWING_USER_LIST;
  isHideSubscribeToggleButton?: boolean;
}

const UserListModal = ({
  userId,
  isFollowing,
  modalKey,
  isHideSubscribeToggleButton = false,
}: UserListProps) => {
  const user = useUser(userId);
  const { session, isLogin } = useUserStatus();
  const { followingCount, followerCount } = useFollowInfo(userId);

  const { followUserList, refetchNextFollowUserList } =
    useInfinityFollowUserList({
      targetUserId: userId,
      isFollowing,
    });

  const intersectRef = useIntersect(() => {
    refetchNextFollowUserList();
  });

  return (
    <Modal modalKey={modalKey}>
      <s.Wrapper>
        {isFollowing ? (
          <s.Title>
            <span>{user?.name}</span>님이 구독하는 서재{' '}
            <span>{followingCount}</span>
          </s.Title>
        ) : (
          <s.Title>
            <span>{user?.name}</span>의 서재를 구독하는 사람{' '}
            <span>{followerCount}</span>
          </s.Title>
        )}
        <ul>
          {!!followUserList &&
            followUserList.map(({ id, name, introduce, isFollow }) => (
              <s.UserItem key={id}>
                <s.ProfileWrapper>
                  <Link href={`/${id}${Route.LIBRARY}`}>
                    <s.Name>{name}</s.Name>
                  </Link>
                  {!!introduce && <s.Introduce>{introduce}</s.Introduce>}
                </s.ProfileWrapper>
                {!isHideSubscribeToggleButton &&
                  isLogin &&
                  session.id !== id && (
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
      </s.Wrapper>
    </Modal>
  );
};

export default UserListModal;
