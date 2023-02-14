import BookReivew from '@/components/templates/BookReivew';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';

const sejulValue = `"익숙하고 안전한 길 대신 낯설고 불확실한 길을 선택하는 이유는 나의 가치와 가능성을 발견하며 나답게 살고 싶기 때문이다."\n
  "오늘이 인생의 마지막 날이라면 이미 실패한 일을 후회할 것인가, 아니면 시도하지 않은 일을 후회할 것인가?"\n
  "시도하지 않을 바에야 차라리 실패를 하자."`;

const contentValue = `<h2>목차</h2>
  <ul>
  <li>목차1<br>
  <ul>
  <li>목차1-1</li>
  </ul>
  </li>
  <li>목차2
  <ul>
  <li>목차2-1</li>
  <li>목차2-2</li>
  </ul>
  </li>
  <li>목차3</li>
  </ul>
  <h2>느낀점</h2>
  <p>안녕하세요 세 줄 독후감입니다.</p>
  <p><span style="color: rgb(224, 62, 45);">안녕하세요 세 줄 독후감입니다.</span></p>
  <p>&nbsp;</p>
  <p><img src="https://image.kmib.co.kr/online_image/2021/0903/2021090220380531799_1630582685_0924207731.jpg" alt="살며 사랑하며] 책정리 하는 척 - 국민일보" width="490" height="342"></p>`;

const BookreviewPage = () => (
  <BookReivew
    sejul={<SejulTextarea value={sejulValue} readonly />}
    content={<ContentEditor value={contentValue} readonly />}
  />
);

export default BookreviewPage;
