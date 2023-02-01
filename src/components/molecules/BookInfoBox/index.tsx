import { Book } from '@/types/domain/book';
import Thumbnail from '@/components/atoms/Thumbnail';
import formatDateToKorean from '@/utils/formatDateToKorean';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

const BookInfoBox = ({
  title,
  authors,
  thumbnail,
  publisher,
  datetime,
}: Book) => {
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
        width={lightTheme.TUMBNAIL.MEDIUM.W}
        height={lightTheme.TUMBNAIL.MEDIUM.H}
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

export default BookInfoBox;
