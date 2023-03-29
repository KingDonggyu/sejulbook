import { GetServerSidePropsContext } from 'next';
import SEO from '@/components/atoms/SEO';
import prefetchQuery from '@/services/prefetchQuery';
import { getBookReviewListInfinityQuery } from '@/services/queries/bookReview';
import { dehydrate } from '@tanstack/react-query';
import { BookTitle } from '@/types/features/book';
import useInfinityBookReviewList from '@/hooks/services/infinityQueries/useInfinityBookReviewList';
import SearchResultTemplate from '@/components/templates/SearchResult';
import Bookshelf from '@/components/organisms/Bookshelf';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import SortDropdown from '@/components/molecules/SortDropdown';
import { useEffect, useState } from 'react';
import Route from '@/constants/routes';

const SearchResultPage = ({ title }: { title: BookTitle }) => {
  const { bookReviewList: initBookReviewList, refetchBookReviewList } =
    useInfinityBookReviewList(title);

  const [bookReviewList, setBookReviewList] = useState(initBookReviewList);

  useEffect(() => {
    setBookReviewList(initBookReviewList);
  }, [initBookReviewList]);

  const handleClickLatestSortButton = () => {
    setBookReviewList(initBookReviewList);
  };

  const handleClickLikeSortButton = () => {
    const list = [...bookReviewList];
    setBookReviewList(list.sort((a, b) => b.likeCount - a.likeCount));
  };

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
          !!bookReviewList.length && (
            <Bookshelf
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
    q: BookTitle;
  };
}

export const getServerSideProps = async ({
  query,
}: ExtededGetServerSidePropsContext) => {
  const { q } = query;

  const queryClient = await prefetchQuery(
    [],
    [getBookReviewListInfinityQuery({ query: q })],
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: q,
    },
  };
};

export default SearchResultPage;
