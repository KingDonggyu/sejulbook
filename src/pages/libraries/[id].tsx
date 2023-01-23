import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';
import Bookshelf from '@/components/organisms/Bookshelf';
import * as s from './style';

const LibraryPage = () => (
  <div css={s.pageStyle}>
    <DocumentTitle title="김동규의 서재" />
    <Profile />
    <s.Divider />
    <Bookshelf />
  </div>
);

export default LibraryPage;
