import { ReactNode } from 'react';

import * as s from './style';

interface LibraryProps {
  profile: ReactNode;
  profileEditButton: ReactNode;
  bookReivewSortButton: ReactNode;
  bookshelf: ReactNode;
}

const Library = ({
  profile,
  profileEditButton,
  bookReivewSortButton,
  bookshelf,
}: LibraryProps) => (
  <s.Wrapper>
    <s.TopSectionWrapper>
      {profile}
      <s.ButtonWrapper>
        {profileEditButton}
        {bookReivewSortButton}
      </s.ButtonWrapper>
    </s.TopSectionWrapper>
    <s.Divider />
    {bookshelf}
  </s.Wrapper>
);

export default Library;
