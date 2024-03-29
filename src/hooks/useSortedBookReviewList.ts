import { useEffect, useState } from 'react';
import type { GetBookReviewPageResponse } from 'bookReview';

const useSortedBookReviewList = (
  initBookReviewList: GetBookReviewPageResponse[],
) => {
  const [isLikeSorted, setIsLikeSorted] = useState(false);
  const [bookReviewList, setBookReviewList] = useState(initBookReviewList);

  useEffect(() => {
    const list = [...initBookReviewList];
    setBookReviewList(
      isLikeSorted ? list.sort((a, b) => b.likeCount - a.likeCount) : list,
    );
  }, [initBookReviewList, isLikeSorted]);

  const handleClickLatestSortButton = () => {
    setIsLikeSorted(false);
    setBookReviewList(initBookReviewList);
  };

  const handleClickLikeSortButton = () => {
    const list = [...bookReviewList];
    setIsLikeSorted(true);
    setBookReviewList(list.sort((a, b) => b.likeCount - a.likeCount));
  };

  return {
    bookReviewList,
    handleClickLatestSortButton,
    handleClickLikeSortButton,
  };
};

export default useSortedBookReviewList;
