import { Book } from '@/types/features/book';
import Box from '@/components/atoms/Box';
import Button, { ButtonProps } from '@/components/atoms/Button';
import Thumbnail from '@/components/atoms/Thumbnail';
import Menu from '@/components/molecules/Menu';
import formatDate from '@/utils/formatDateToKorean';
import useOpenClose from '@/hooks/useOpenClose';
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
    { label: '발매', content: formatDate(datetime) },
  ];

  return (
    <Box variant={BoxVariant.OUTLINED} css={s.boxStyle}>
      <Thumbnail
        src={thumbnail}
        alt={`${title} 표지 이미지`}
        width={lightTheme.TUMBNAIL.SMALL.W}
        height={lightTheme.TUMBNAIL.SMALL.H}
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

const BookInfoBoxButton = ({ children, ...bookInfo }: Book & ButtonProps) => {
  const { anchorEl, handleToggle, handleClose } = useOpenClose();

  return (
    <div>
      <Button onClick={handleToggle}>{children}</Button>
      <Menu
        anchorEl={anchorEl}
        top={8}
        right={-2}
        elevation={6}
        handleClose={handleClose}
      >
        <BookInfoBox {...bookInfo} />
      </Menu>
    </div>
  );
};

BookInfoBox.Button = BookInfoBoxButton;

export default BookInfoBox;
