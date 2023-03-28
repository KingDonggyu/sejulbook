const getMaxBookReviewId = async (
  maxId: number | null,
  bookReviewModelMethod: () => Promise<number | null>,
) => {
  let bookReviewId = maxId;

  if (!maxId) {
    bookReviewId = await bookReviewModelMethod();

    if (!bookReviewId) {
      return null;
    }

    bookReviewId += 1;
  }

  if (!bookReviewId) {
    return null;
  }

  return bookReviewId;
};

export default getMaxBookReviewId;
