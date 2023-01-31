import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import BookInfoBox from '@/components/organisms/BookInfoBox';
import * as s from './style';

const NewbookPage = () => (
  <s.Wrapper>
    <DocumentTitle title="독후감 쓰기" />
    <s.BookSelectText>책을 선택해주세요.</s.BookSelectText>
    <BookSearchBar />
    <s.HiddenWrapper>
      <BookInfoBox.WritingTarget />
    </s.HiddenWrapper>
  </s.Wrapper>
);

export default NewbookPage;
