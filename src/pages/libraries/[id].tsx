import { css } from '@emotion/react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';
import Bookshelf from '@/components/organisms/Bookshelf';

const pageStyle = css`
  margin: auto;
  width: 800px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const LibraryPage = () => (
  <div css={pageStyle}>
    <DocumentTitle title="김동규의 서재" />
    <Profile />
    <Bookshelf />
  </div>
);

export default LibraryPage;
