import { ReactNode } from 'react';

import * as s from './style';

interface LibraryProps {
  hasUser: boolean;
  profile: ReactNode;
  profileEditButton: ReactNode;
  bookReivewSortButton: ReactNode;
  bookshelf: ReactNode;
}

const Library = ({
  hasUser,
  profile,
  profileEditButton,
  bookReivewSortButton,
  bookshelf,
}: LibraryProps) => (
  <s.Wrapper>
    <s.TopSectionWrapper>
      {profile}
      {hasUser ? (
        <s.ButtonWrapper>
          {profileEditButton}
          {bookReivewSortButton}
        </s.ButtonWrapper>
      ) : (
        <s.TopSectionSkeleton />
      )}
    </s.TopSectionWrapper>
    <s.Divider />
    {hasUser && bookshelf}
  </s.Wrapper>
);

export default Library;
