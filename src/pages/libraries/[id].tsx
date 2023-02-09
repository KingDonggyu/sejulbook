import Library from '@/components/templates/Library';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Profile from '@/components/organisms/Profile';
import ProfileEditButton from '@/components/molecules/ProfileEditButton';
import BookReivewSort from '@/components/organisms/BookReivewSort';
import Bookshelf from '@/components/organisms/Bookshelf';

const LibraryPage = () => (
  <>
    <DocumentTitle title="김동규의 서재" />
    <Library
      profile={<Profile />}
      profileEditButton={<ProfileEditButton />}
      bookReivewSortButton={<BookReivewSort />}
      bookshelf={<Bookshelf />}
    />
  </>
);

export default LibraryPage;
