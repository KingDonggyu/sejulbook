import { toast } from 'react-toastify';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import useOpenClose from '@/hooks/useOpenClose';
import useUserStatus from '@/hooks/useUserStatus';
import { Book } from '@/types/features/book';
import { BookReviewId } from '@/types/features/bookReview';
import bookReviewStore from '@/stores/bookReviewStore';
import { publishBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';

import Button from '@/components/atoms/Button';
import SideBar from '@/components/molecules/SideBar';
import Rating from '@/components/molecules/Rating';
import TagInput from '@/components/molecules/TagInput';
import ThumbnailUploader from '@/components/organisms/ThumbnailUploader';
import CategoryModal from '@/components/organisms/CategoryModal';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';
import * as s from './style';

type CompleteHandler = (bookReviewId: BookReviewId) => void;

interface PublishSideBarProps {
  newbook: Book;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleComplete?: CompleteHandler;
}

const PublishSideBar = ({
  newbook,
  anchorEl,
  handleClose,
  handleComplete,
}: PublishSideBarProps) => {
  const { session, isLogin } = useUserStatus();
  const { bookReview, setCategory, setRating, setTag } = bookReviewStore();

  const handlePublish = async () => {
    try {
      if (!isLogin) {
        return;
      }

      const bookReviewId = await publishBookReview({
        bookReview,
        userId: session.id,
      });

      if (handleComplete) {
        handleComplete(bookReviewId);
      }
    } catch (error) {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <SideBar anchorEl={anchorEl} handleClose={handleClose}>
      <s.Wrapper>
        <s.PublishInfoItem>
          <s.Label>책 표지 사진</s.Label>
          <s.ExplainText>* 대표 이미지로 사용됩니다.</s.ExplainText>
          <ThumbnailUploader originThumbnail={newbook.thumbnail} />
        </s.PublishInfoItem>
        <s.PublishInfoItem>
          <s.Label>카테고리</s.Label>
          <CategoryModal.Button
            modalKey={ModalKey.CATEGORY}
            handleClickCategory={setCategory}
          />
        </s.PublishInfoItem>
        <s.PublishInfoItem>
          <s.Label>평점</s.Label>
          <Rating
            size={17}
            gap={4}
            init={bookReview.rating}
            handleClickRating={setRating}
          />
        </s.PublishInfoItem>
        <s.PublishInfoItem>
          <s.Label>태그</s.Label>
          <TagInput handleUpdate={setTag} />
        </s.PublishInfoItem>
        <s.ButtonWrapper>
          <DraftSaveButton />
          <Button
            variant={ButtonVariant.OUTLINED}
            color={ColorVariant.PRIMARY}
            onClick={handlePublish}
          >
            발행
          </Button>
        </s.ButtonWrapper>
      </s.Wrapper>
    </SideBar>
  );
};

const PublishButton = ({
  newbook,
  handleComplete,
}: {
  newbook: Book;
  handleComplete?: CompleteHandler;
}) => {
  const { anchorEl, handleOpen, handleClose } = useOpenClose();

  return (
    <>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.PRIMARY}
        onClick={handleOpen}
      >
        발행
      </Button>
      <PublishSideBar
        newbook={newbook}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleComplete={handleComplete}
      />
    </>
  );
};

PublishSideBar.Button = PublishButton;

export default PublishSideBar;
