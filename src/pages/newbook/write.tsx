import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';
import checkIsLoggedIn from '@/server/middlewares/checkIsLoggedIn';
import type { Id } from 'bookReview';

import LogoButton from '@/components/molecules/LogoButton';
import NewbookWriteTemplate from '@/components/templates/NewbookWrite';
import SEO from '@/components/atoms/SEO';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';
import Route from '@/constants/routes';
import { bookReviewError } from '@/constants/message';

import useS3GarbageCollection from '@/hooks/useS3GarbageCollection';
import useNewBookStorage from '@/hooks/useNewBookStorage';
import useNewBookReview from '@/hooks/useNewBookReview';
import useHiddenLayout from '@/hooks/useHiddenLayout';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';

import prefetchQuery from '@/lib/react-query/prefetchQuery';
import { getBookReviewQuery } from '@/hooks/services/queries/useBookReview';
import { getTagsQuery } from '@/hooks/services/queries/useTags';
import bookReviewStore from '@/stores/newBookReviewStore';
import { useEffect } from 'react';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

const NewbookWritePage = ({
  bookReviewId,
  isPublished,
}: {
  bookReviewId?: Id;
  isPublished?: boolean;
}) => {
  const { newBook } = useNewBookStorage();
  const { newBookReview } = useNewBookReview(bookReviewId);
  const { savedBookReviewId } = useSavedBookReviewId();

  useHiddenLayout();
  useS3GarbageCollection(); // 페이지 이동, 새로고침, 탭 닫기 동작시 불필요한 S3 이미지 제거

  const { setBook, setBookReivew, initBookReview } = bookReviewStore();

  const book = (isPublished ? newBookReview?.book : newBook) || null;
  const isLoading = !book && !newBookReview;

  useEffect(() => {
    if (!isPublished && !savedBookReviewId) {
      initBookReview();
    }
  }, [initBookReview, isPublished, savedBookReviewId]);

  useEffect(() => {
    if (newBookReview) {
      setBookReivew(newBookReview);
      return;
    }
    if (book) {
      setBook(book);
    }
  }, [book, newBookReview, setBook, setBookReivew]);

  return (
    <>
      <SEO title="독후감 쓰기" />
      {!isLoading && (
        <NewbookWriteTemplate
          logo={<LogoButton />}
          bookName={book ? book.title : undefined}
          sejulTextarea={<SejulTextArea />}
          contentTextarea={<ContentEditor />}
          publishButton={
            <PublishSideBar.Button isHiddenDraftSaveButton={isPublished} />
          }
          draftSaveButton={!isPublished && <DraftSaveButton />}
        />
      )}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { isLoggedIn, userId } = await checkIsLoggedIn(ctx);

  if (!isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: Route.HOME,
      },
      props: {},
    };
  }

  try {
    const bookReviewId = ctx.query.draft || ctx.query.publish;

    if (!bookReviewId) {
      return { props: {} };
    }

    const isMine = await new BookReviewRepository().checkIsMine({
      userId,
      id: +bookReviewId,
    });

    if (!isMine) {
      return {
        props: {
          notFound: true,
          title: '잘못된 접근입니다.',
          errorMessage: '인증에 실패하여 페이지에 접근할 수 없습니다.',
        },
      };
    }

    const queryClient = await prefetchQuery([
      getBookReviewQuery(+bookReviewId),
      getTagsQuery(+bookReviewId),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        isPublished: !!ctx.query.publish,
        bookReviewId,
      },
    };
  } catch {
    return {
      props: {
        notFound: true,
        title: bookReviewError.NOT_FOUND,
        errorMessage: '404 - Bookreview is not Found',
      },
    };
  }
};

export default NewbookWritePage;
