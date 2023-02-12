import { Book } from '@/types/domain/book';
import Box from '@/components/atoms/Box';
import Thumbnail from '@/components/atoms/Thumbnail';
import formatDateToKorean from '@/utils/formatDateToKorean';
import { BoxVariant } from '@/constants';
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
    { label: '저자', content: authors.join(', ') },
    { label: '출판', content: publisher },
    { label: '발매', content: formatDateToKorean(datetime) },
  ];

  return (
    <Box variant={BoxVariant.OUTLINED} css={s.boxStyle}>
      <Thumbnail
        src={thumbnail}
        alt={`${title} 표지 이미지`}
        width={lightTheme.TUMBNAIL.MEDIUM.W}
        height={lightTheme.TUMBNAIL.MEDIUM.H}
      />
      <s.InfoList>
        <s.BookTitle>{title}</s.BookTitle>
        {bookInfoList.map(({ label, content }) => (
          <s.InfoItem key={label}>
            <s.Label>{label}</s.Label>
            <s.Content>{content}</s.Content>
          </s.InfoItem>
        ))}
      </s.InfoList>
    </Box>
  );
};

export default BookInfoBox;
