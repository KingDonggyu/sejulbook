import { GetServerSidePropsContext } from 'next';
import SEO from '@/components/atoms/SEO';
import useInfiniteBookReviewListByBookname from '@/hooks/services/infiniteQueries/useInfiniteBookReviewListByBookname';
import useSortedBookReviewList from '@/hooks/useSortedBookReviewList';
import SearchResultTemplate from '@/components/templates/SearchResult';
import Bookshelf from '@/components/organisms/Bookshelf';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import SortDropdown from '@/components/molecules/SortDropdown';
import Route from '@/constants/routes';

const SearchResultPage = ({ title }: { title: string }) => {
  const {
    bookReviewList: initBookReviewList,
    refetchBookReviewList,
    isLoading,
    isInitialLoading,
  } = useInfiniteBookReviewListByBookname(title);

  const {
    bookReviewList,
    handleClickLatestSortButton,
    handleClickLikeSortButton,
  } = useSortedBookReviewList(initBookReviewList);

  return (
    <>
      <SEO
        title={title}
        description={`'${title}' 책으로 검색한 독후감`}
        image={bookReviewList.length ? bookReviewList[0].thumbnail : undefined}
        url={`${Route.SEARCH_RESULT_BY_BOOK}?q=${title}`}
      />
      <SearchResultTemplate
        pageTitle={`'${title}'`}
        searchBar={<BookSearchBar initialValue={title} />}
        sortButton={
          <SortDropdown
            onClickLatestButton={handleClickLatestSortButton}
            onClickLikeSortButton={handleClickLikeSortButton}
          />
        }
        bookshelf={
          (isInitialLoading || !!bookReviewList.length) && (
            <Bookshelf
              showSkeleton={isInitialLoading}
              isLoading={isLoading}
              hasWriteBookReviewItem={false}
              bookReviewList={bookReviewList}
              onRefetch={refetchBookReviewList}
            />
          )
        }
      />
    </>
  );
};

interface ExtededGetServerSidePropsContext
  extends Omit<GetServerSidePropsContext, 'query'> {
  query: {
    q: string;
  };
}

export const getServerSideProps = async ({
  query,
}: ExtededGetServerSidePropsContext) => {
  const { q } = query;

  if (q === undefined) {
    return {
      props: {},
      redirect: {
        destination: Route.SEARCH,
        permanent: false,
      },
    };
  }

  return { props: { title: q } };
};

export default SearchResultPage;
