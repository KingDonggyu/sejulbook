import { Book } from '@/types/domain/book';
import Thumbnail from '@/components/atoms/Thumbnail';
import formatDateToKorean from '@/utils/formatDateToKorean';
import { thumbnailSize } from '@/styles/common';
import * as s from './style';

const BookInfo = ({ title, authors, thumbnail, publisher, datetime }: Book) => {
  const bookInfoList = [
    { label: '제목', content: title },
    { label: '저자', content: authors.join(', ') },
    { label: '출판사', content: publisher },
    { label: '출판일', content: formatDateToKorean(datetime) },
  ];

  return (
    <s.Wrapper>
      <Thumbnail
        src={thumbnail}
        alt={`${title} 표지 이미지`}
        width={thumbnailSize.mediumWidth}
        height={thumbnailSize.mediumHeight}
      />
      <s.InfoList>
        {bookInfoList.map(({ label, content }) => (
          <s.InfoItem key={label}>
            <s.Label>{label}</s.Label>
            <s.Content>{content}</s.Content>
          </s.InfoItem>
        ))}
      </s.InfoList>
    </s.Wrapper>
  );
};

const WritingTarget = () => {
  const targetBook: Book = {
    title: '브레이킹 루틴 브레이킹 루틴 브레이킹 루틴 브레이킹 루틴',
    authors: ['천인우'],
    thumbnail:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5923940%3Ftimestamp%3D20221107223020',
    publisher: '중앙북스',
    datetime: '2021-12-20T00:00:00.000+09:00',
  };

  return <BookInfo {...targetBook} />;
};

BookInfo.WritingTarget = WritingTarget;

export default BookInfo;
