import { useEffect } from 'react';
import { Router } from 'next/router';
import Link from 'next/link';
import type { Id as UserId } from 'user';

import Route from '@/constants/routes';
import { ModalKey } from '@/constants/keys';
import useUserStatus from '@/hooks/useUserStatus';
import useIntersect from '@/hooks/useIntersect';
import useUser from '@/hooks/services/queries/useUser';
import useFollowInfo from '@/hooks/services/queries/useFollowInfo';
import useInfinityFollowUserList from '@/hooks/services/infiniteQueries/useInfiniteFollowUserList';
import modalStore from '@/stores/modalStore';
import Modal from '@/components/molecules/Modal';
import SubscribeToggleButton from '../SubscribeToggleButton';
import * as s from './style';

interface UserListProps {
  userId: UserId;
  isFollowing: boolean;
  modalKey: ModalKey.FOLLOWER_USER_LIST | ModalKey.FOLLOWING_USER_LIST;
}

const UserListModal = ({ userId, isFollowing, modalKey }: UserListProps) => {
  const { closeModal } = modalStore();

  const { user } = useUser(userId);
  const { session, isLogin } = useUserStatus();
  const { followInfo } = useFollowInfo(userId);
  const { followUserList, refetchNextFollowUserList } =
    useInfinityFollowUserList({
      userId,
      isFollowing,
    });

  const intersectRef = useIntersect(() => {
    refetchNextFollowUserList();
  });

  useEffect(() => {
    const handleBeforeRouteChange = () => {
      closeModal(ModalKey.FOLLOWING_USER_LIST);
      closeModal(ModalKey.FOLLOWER_USER_LIST);
    };

    Router.events.on('routeChangeStart', handleBeforeRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleBeforeRouteChange);
    };
  }, [closeModal]);

  if (!user || !followInfo) {
    return null;
  }

  return (
    <Modal modalKey={modalKey}>
      <s.Wrapper>
        {isFollowing ? (
          <s.Title>
            <span>{user?.name}</span>님이 구독하는 서재{' '}
            <span>{followInfo.followingCount}</span>
          </s.Title>
        ) : (
          <s.Title>
            <span>{user?.name}</span>의 서재를 구독하는 사람{' '}
            <span>{followInfo.followerCount}</span>
          </s.Title>
        )}
        <ul>
          {followUserList.map(({ id, name, introduce, isFollow }) => (
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
      </s.Wrapper>
    </Modal>
  );
};

export default UserListModal;
