import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import SEO from '@/components/atoms/SEO';
import SearchResultTemplate from '@/components/templates/SearchResult';
import Bookshelf from '@/components/organisms/Bookshelf';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import SortDropdown from '@/components/molecules/SortDropdown';
import prefetchQuery from '@/lib/react-query/prefetchQuery';
import useInfiniteBookReviewListByCategory, {
  getBookReviewListByCategoryInfinityQuery,
} from '@/hooks/services/infiniteQueries/useInfiniteBookReviewListByCategory';
import useSortedBookReviewList from '@/hooks/useSortedBookReviewList';
import Route from '@/constants/routes';

const SearchResultPage = ({ category }: { category: string }) => {
  const {
    bookReviewList: initBookReviewList,
    refetchBookReviewList,
    isLoading,
  } = useInfiniteBookReviewListByCategory(category);

  const {
    bookReviewList,
    handleClickLatestSortButton,
    handleClickLikeSortButton,
  } = useSortedBookReviewList(initBookReviewList);

  return (
    <>
      <SEO
        title={category}
        description={`'${category}' 카테고리로 검색한 독후감`}
        image={bookReviewList.length ? bookReviewList[0].thumbnail : undefined}
        url={`${Route.SEARCH_RESULT_BY_CATEGORY}?q=${category}`}
      />
      <SearchResultTemplate
        pageTitle={category}
        searchBar={<BookSearchBar />}
        sortButton={
          <SortDropdown
            onClickLatestButton={handleClickLatestSortButton}
            onClickLikeSortButton={handleClickLikeSortButton}
          />
        }
        bookshelf={
          !!bookReviewList.length && (
            <Bookshelf
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

  const queryClient = await prefetchQuery(
    [],
    [getBookReviewListByCategoryInfinityQuery({ category: q })],
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category: q,
    },
  };
};

export default SearchResultPage;
