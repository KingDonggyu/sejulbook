import Link from 'next/link';
import { ButtonVariant, ColorVariant } from '@/constants';
import Button from '@/components/atoms/Button';
import * as s from './style';

const Profile = () => (
  <s.Wrapper>
    <s.Title>
      <span>김동규</span>의 서재
    </s.Title>
    <s.Introduce>안녕하세요 개발자 김동규입니다.</s.Introduce>
    <s.BottomWrapper>
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
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.PRIMARY}
        css={s.editProfileStyle}
      >
        프로필 편집
      </Button>
    </s.BottomWrapper>
  </s.Wrapper>
);

export default Profile;
