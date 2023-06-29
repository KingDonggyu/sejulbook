import type { Id as UserId } from 'user';
import type { GetFollowInfoResponse } from 'follow';
import useUser from '@/hooks/services/queries/useUser';
import modalStore from '@/stores/modalStore';
import Button from '@/components/atoms/Button';
import { ModalKey } from '@/constants/keys';
import * as s from './style';
import UserListModal from '../UserListModal';

interface ProfileProps extends GetFollowInfoResponse {
  userId: UserId;
  bookReviewCount: number;
}

const Profile = ({
  userId,
  bookReviewCount,
  followerCount,
  followingCount,
}: ProfileProps) => {
  const { user } = useUser(userId);
  const { openModal } = modalStore();

  if (!user) {
    return null;
  }

  return (
    <>
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
            <Button onClick={() => openModal(ModalKey.FOLLOWER_USER_LIST)}>
              <span>구독자</span>
              <em>{followerCount}</em>
            </Button>
          </s.DatailItem>
          <s.DatailItem>
            <Button onClick={() => openModal(ModalKey.FOLLOWING_USER_LIST)}>
              <span>관심서재</span>
              <em>{followingCount}</em>
            </Button>
          </s.DatailItem>
        </s.DetailWrapper>
      </s.Wrapper>
      <UserListModal
        isFollowing
        userId={userId}
        modalKey={ModalKey.FOLLOWING_USER_LIST}
      />
      <UserListModal
        isFollowing={false}
        userId={userId}
        modalKey={ModalKey.FOLLOWER_USER_LIST}
      />
    </>
  );
};

export default Profile;
