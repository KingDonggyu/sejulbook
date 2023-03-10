import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { ButtonVariant, ColorVariant } from '@/constants';
import Route from '@/constants/routes';
import { ModalKey } from '@/constants/keys';
import { userError } from '@/constants/message';
import useOpenClose from '@/hooks/useOpenClose';
import useUserStatus from '@/hooks/useUserStatus';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import { Book } from '@/types/features/book';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import { publishBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import getUsedS3ImageURLs from '@/utils/getUsedS3ImageURLs';

import Button from '@/components/atoms/Button';
import SideBar from '@/components/molecules/SideBar';
import Rating from '@/components/molecules/Rating';
import TagInput from '@/components/molecules/TagInput';
import ThumbnailUploader from '@/components/organisms/ThumbnailUploader';
import CategoryModal from '@/components/organisms/CategoryModal';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';
import { editorElementId } from '@/components/organisms/ContentEditor';
import * as s from './style';

interface PublishSideBarProps {
  newbook: Book;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const PublishSideBar = ({
  newbook,
  anchorEl,
  handleClose,
}: PublishSideBarProps) => {
  const router = useRouter();
  const { session, isLogin } = useUserStatus();
  const { savedBookReviewId } = useSavedBookReviewId();

  const { deleteImageKey } = s3ImageURLStore();
  const { bookReview, setCategory, setRating, setTag } = bookReviewStore();

  const [isPossiblePublish, setIsPossiblePublish] = useState(true);

  const handlePublish = async () => {
    try {
      if (!isPossiblePublish) {
        return;
      }

      if (!isLogin) {
        toast.error(userError.NOT_LOGGED);
        return;
      }

      setIsPossiblePublish(false);

      const bookReviewId = await publishBookReview({
        userId: session.id,
        bookReviewId: savedBookReviewId,
        bookReview,
      });

      // 사용하는 이미지는 S3가비지컬렉션에 수집되지 않도록 제외
      getUsedS3ImageURLs(editorElementId).forEach((url) => {
        deleteImageKey(url);
      });

      if (bookReview.thumbnail) {
        deleteImageKey(bookReview.thumbnail);
      }

      router.replace(`${Route.BOOKREVIEW}/${bookReviewId}`);
    } catch (error) {
      setIsPossiblePublish(true);
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
          <ThumbnailUploader
            originThumbnail={bookReview.thumbnail || newbook.thumbnail}
          />
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
          <TagInput initTagList={bookReview.tag} handleUpdate={setTag} />
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

const PublishSidebarButton = ({ newbook }: { newbook: Book }) => {
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
      />
    </>
  );
};

PublishSideBar.Button = PublishSidebarButton;

export default PublishSideBar;
