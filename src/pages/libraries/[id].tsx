import DocumentTitle from '@/components/atoms/DocumentTitle';
import ProfileEditButton from '@/components/molecules/ProfileEditButton';
import Profile from '@/components/organisms/Profile';
import Bookshelf from '@/components/organisms/Bookshelf';
import * as s from './style';

const LibraryPage = () => (
  <s.Wrapper>
    <DocumentTitle title="김동규의 서재" />
    <s.TopSectionWrapper>
      <Profile />
      <ProfileEditButton />
    </s.TopSectionWrapper>
    <s.Divider />
    <Bookshelf />
  </s.Wrapper>
);

export default LibraryPage;
