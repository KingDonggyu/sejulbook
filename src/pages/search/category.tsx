import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import SEO from '@/components/atoms/SEO';
import SearchResultTemplate from '@/components/templates/SearchResult';
import Bookshelf from '@/components/organisms/Bookshelf';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import SortDropdown from '@/components/molecules/SortDropdown';
import prefetchQuery from '@/services/prefetchQuery';
import { getBookReviewListByCategoryInfinityQuery } from '@/services/queries/bookReview';
import useInfinityBookReviewListByCategory from '@/hooks/services/infinityQueries/useInfinityBookReviewListByCategory';
import { BookTitle } from '@/types/features/book';
import { Category } from '@/types/features/category';
import Route from '@/constants/routes';

const SearchResultPage = ({ category }: { category: Category }) => {
  const { bookReviewList: initBookReviewList, refetchBookReviewList } =
    useInfinityBookReviewListByCategory(category);

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
    [getBookReviewListByCategoryInfinityQuery({ query: q })],
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category: q,
    },
  };
};

export default SearchResultPage;
