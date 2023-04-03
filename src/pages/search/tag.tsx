import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import SEO from '@/components/atoms/SEO';
import SearchResultTemplate from '@/components/templates/SearchResult';
import Bookshelf from '@/components/organisms/Bookshelf';
import SortDropdown from '@/components/molecules/SortDropdown';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import prefetchQuery from '@/services/prefetchQuery';
import { getBookReviewListByTagInfinityQuery } from '@/services/queries/bookReview';
import useInfinityBookReviewListByTag from '@/hooks/services/infinityQueries/useInfinityBookReviewListByTag';
import useSortedBookReviewList from '@/hooks/useSortedBookReviewList';
import { Tag } from '@/types/features/tag';
import Route from '@/constants/routes';

const SearchResultPage = ({ tag }: { tag: Tag }) => {
  const {
    bookReviewList: initBookReviewList,
    refetchBookReviewList,
    isLoading,
  } = useInfinityBookReviewListByTag(tag);

  const {
    bookReviewList,
    handleClickLatestSortButton,
    handleClickLikeSortButton,
  } = useSortedBookReviewList(initBookReviewList);

  return (
    <>
      <SEO
        title={`#${tag}`}
        description={`'${tag}' 태그로 검색한 독후감`}
        image={bookReviewList.length ? bookReviewList[0].thumbnail : undefined}
        url={`${Route.SEARCH_RESULT_BY_TAG}?q=${tag}`}
      />
      <SearchResultTemplate
        pageTitle={`#${tag}`}
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
    q: Tag;
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
    [getBookReviewListByTagInfinityQuery({ query: q })],
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      tag: q,
    },
  };
};

export default SearchResultPage;
