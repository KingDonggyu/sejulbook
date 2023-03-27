import { ReactNode } from 'react';
import * as s from './style';

interface SubscriptionsTemplateProps {
  followingUserListModalButton: ReactNode;
  bookshelf: ReactNode;
}

const SubscriptionsTemplate = ({
  followingUserListModalButton,
  bookshelf,
}: SubscriptionsTemplateProps) => (
  <s.Wrapper>
    <s.Title>
      당신의 마음을 얻은 <span>서재</span>
    </s.Title>
    {followingUserListModalButton}
    <s.BookReviewListWrapper>{bookshelf}</s.BookReviewListWrapper>
  </s.Wrapper>
);

export default SubscriptionsTemplate;
