import { GetServerSidePropsContext } from 'next';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import prefetchQuery from '@/services/prefetchQuery';
import { getBookReviewListInfinityQuery } from '@/services/queries/bookReview';
import { dehydrate } from '@tanstack/react-query';
import { BookTitle } from '@/types/features/book';
import useInfinityBookReviewList from '@/hooks/services/queries/useInfinityBookReviewList';
import SearchResultTemplate from '@/components/templates/SearchResult';
import Bookshelf from '@/components/organisms/Bookshelf';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import SortDropdown from '@/components/molecules/SortDropdown';
import { useEffect, useState } from 'react';

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
      <DocumentTitle title="" />
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
    title: BookTitle;
  };
}

export const getServerSideProps = async ({
  query,
}: ExtededGetServerSidePropsContext) => {
  const { title } = query;

  const queryClient = await prefetchQuery(
    [],
    [getBookReviewListInfinityQuery({ title })],
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title,
    },
  };
};

export default SearchResultPage;
