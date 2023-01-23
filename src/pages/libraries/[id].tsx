import { css } from '@emotion/react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';

const pageStyle = css`
  padding: 40px;
`;

const LibraryPage = () => (
  <div css={pageStyle}>
    <DocumentTitle title="김동규의 서재" />
    <Profile />
  </div>
);

export default LibraryPage;
