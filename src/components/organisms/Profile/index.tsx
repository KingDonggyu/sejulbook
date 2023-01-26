import Link from 'next/link';
import * as s from './style';

const Profile = () => (
  <s.Wrapper>
    <s.Title>
      <span>김동규</span>의 서재
    </s.Title>
    <s.Introduce>안녕하세요 개발자 김동규입니다.</s.Introduce>
    <s.DetailWrapper>
      <s.DatailItem>
        <span>읽은 책</span>
        <em>3</em>
      </s.DatailItem>
      <s.DatailItem>
        <Link href="/">
          <span>구독자</span>
          <em>17</em>
        </Link>
      </s.DatailItem>
      <s.DatailItem>
        <Link href="/">
          <span>관심서재</span>
          <em>4</em>
        </Link>
      </s.DatailItem>
    </s.DetailWrapper>
  </s.Wrapper>
);

export default Profile;
