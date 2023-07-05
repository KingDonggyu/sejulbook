import { useRouter } from 'next/router';
import type { Id } from 'bookReview';
import { ButtonVariant, ColorVariant } from '@/constants';
import Route from '@/constants/routes';
import { ModalKey } from '@/constants/keys';
import useOpenClose from '@/hooks/useOpenClose';
import useBookReviewPublication from '@/hooks/services/mutations/useBookReviewPublication';
import useBookReviewEdit from '@/hooks/services/mutations/useBookReviewEdit';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import bookReviewStore from '@/stores/newBookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import getUsedS3ImageURLs from '@/utils/getUsedS3ImageURLs';
import { getBookReviewToPublish } from '@/utils/bookReviewDataConverter';

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
  anchorEl: HTMLElement | null;
  isHiddenDraftSaveButton?: boolean;
  handleClose: () => void;
}

const PublishSideBar = ({
  anchorEl,
  isHiddenDraftSaveButton,
  handleClose,
}: PublishSideBarProps) => {
  const router = useRouter();
  const { deleteImageKey } = s3ImageURLStore();
  const {
    bookReview,
    setCategory,
    setRating,
    setTags: setTag,
  } = bookReviewStore();

  const handleSuccess = (bookReviewId: Id) => {
    if (bookReview.thumbnail) {
      deleteImageKey(bookReview.thumbnail);
    }
    getUsedS3ImageURLs(editorElementId).forEach((url) => {
      deleteImageKey(url);
    });
    router.replace(`${Route.BOOKREVIEW}/${bookReviewId}`);
  };

  const { savedBookReviewId } = useSavedBookReviewId();

  const publishBookReview = useBookReviewPublication({
    onSuccess: handleSuccess,
  });

  const editBookReview = useBookReviewEdit({
    onSuccess: () => {
      if (savedBookReviewId) {
        handleSuccess(savedBookReviewId);
      }
    },
  });

  const handleClickPublishButton = () => {
    if (!savedBookReviewId) {
      publishBookReview(getBookReviewToPublish(bookReview));
      return;
    }
    editBookReview({
      isPublished: true,
      bookReview: {
        ...getBookReviewToPublish(bookReview),
        id: savedBookReviewId,
      },
    });
  };

  return (
    <SideBar anchorEl={anchorEl} handleClose={handleClose}>
      <s.Wrapper>
        <s.PublishInfoItem>
          <s.Label>책 표지 사진</s.Label>
          <s.ExplainText>* 대표 이미지로 사용됩니다.</s.ExplainText>
          <ThumbnailUploader originThumbnail={bookReview.book.thumbnail} />
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
          <TagInput initTagList={bookReview.tags} handleUpdate={setTag} />
        </s.PublishInfoItem>
        <s.ButtonWrapper>
          {!isHiddenDraftSaveButton && <DraftSaveButton />}
          <Button
            variant={ButtonVariant.OUTLINED}
            color={ColorVariant.PRIMARY}
            onClick={handleClickPublishButton}
          >
            발행
          </Button>
        </s.ButtonWrapper>
      </s.Wrapper>
    </SideBar>
  );
};

const PublishSidebarButton = ({
  isHiddenDraftSaveButton,
}: Pick<PublishSideBarProps, 'isHiddenDraftSaveButton'>) => {
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
        anchorEl={anchorEl}
        isHiddenDraftSaveButton={isHiddenDraftSaveButton}
        handleClose={handleClose}
      />
    </>
  );
};

PublishSideBar.Button = PublishSidebarButton;

export default PublishSideBar;
