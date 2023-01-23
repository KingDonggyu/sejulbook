import Image from 'next/image';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

const BookReviewItem = () => (
  <s.Wrapper>
    <Image
      src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbfiCtu%2FbtrGS4A2l6Y%2FtY8QoI1vSxYGl2tQrQkaH1%2Fimg.png"
      alt="책 섬네일 이미지"
      width={170}
      height={220}
      css={s.thumbnailStyle}
    />
    <s.Title>브레이킹 루틴</s.Title>
    <s.Author>천인우 지음</s.Author>
    <s.Rating>
      {Array.from(Array(5), () => (
        <AiFillStar color={lightTheme.COLOR.PRIMARY} />
      ))}
    </s.Rating>
    <s.Date>2023.01.10</s.Date>
  </s.Wrapper>
);

export default BookReviewItem;
