import testImageSrc from '@public/images/test-thumbnail.jpeg';
import CardScoller from '@/components/molecules/CardScroller';
import SejulThumbnail from '../SejulThumbnail';
import * as s from './style';

const sejul = `"변화 없는 삶을 깨뜨리기 위해 걱정과 두려움에서 벗어나 용기있는 도전을 하는 것"

이는 제가 평소 가장 중요시 여기는 '실패를 두려워하지 않는 용기' 덕목과 일치하기에 많은 공감을 하면서 책을 읽을 수 있었습니다.

또한 "열심히 공부하고 일해온 지난 노력은 결국 무엇을 위한 것인가?"라는 질문을 스스로에게 해봄으로써 자기성찰하는 값진 시간을 가지기도 했습니다.`;

const BookReviewScroller = () => (
  <CardScoller css={s.bookReviewListStyle}>
    <SejulThumbnail
      sejul={sejul}
      src={testImageSrc}
      width={300}
      height={400}
      alt="테스트"
      defaultFilter="brightness(0.5)"
      isHiddenChildren
    >
      <s.Content>
        <s.Test>
          <s.Writer>초이의 세 줄</s.Writer>
          <s.BookName>&apos;없던 오늘&apos;</s.BookName>
        </s.Test>
      </s.Content>
    </SejulThumbnail>
  </CardScoller>
);

export default BookReviewScroller;
