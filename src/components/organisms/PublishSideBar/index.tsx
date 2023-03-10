import { useState } from 'react';
import { useRouter } from 'next/router';

import { ButtonVariant, ColorVariant } from '@/constants';
import Route from '@/constants/routes';
import { ModalKey } from '@/constants/keys';
import useOpenClose from '@/hooks/useOpenClose';
import useSavedBookReviewId from '@/hooks/useSavedBookReviewId';
import useBookReviewPublication from '@/hooks/services/mutations/useBookReviewPublication';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import getUsedS3ImageURLs from '@/utils/getUsedS3ImageURLs';
import { BookReviewId } from '@/types/features/bookReview';

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
  handleClose: () => void;
}

const PublishSideBar = ({ anchorEl, handleClose }: PublishSideBarProps) => {
  const router = useRouter();
  const { savedBookReviewId } = useSavedBookReviewId();
  const [isPossiblePublish, setIsPossiblePublish] = useState(true);

  const { deleteImageKey } = s3ImageURLStore();
  const { bookReview, setCategory, setRating, setTag } = bookReviewStore();

  const handleSuccess = (bookReviewId: BookReviewId) => {
    if (bookReview.thumbnail) {
      deleteImageKey(bookReview.thumbnail);
    }

    getUsedS3ImageURLs(editorElementId).forEach((url) => {
      deleteImageKey(url);
    });

    router.replace(`${Route.BOOKREVIEW}/${bookReviewId}`);
  };

  const publishBookReview = useBookReviewPublication({
    bookReview,
    savedBookReviewId,
    onSuccess: handleSuccess,
    onError: () => setIsPossiblePublish(true),
  });

  const handlePublish = () => {
    if (!isPossiblePublish) {
      return;
    }
    setIsPossiblePublish(false);
    publishBookReview();
  };

  return (
    <SideBar anchorEl={anchorEl} handleClose={handleClose}>
      <s.Wrapper>
        <s.PublishInfoItem>
          <s.Label>??? ?????? ??????</s.Label>
          <s.ExplainText>* ?????? ???????????? ???????????????.</s.ExplainText>
          <ThumbnailUploader
            originThumbnail={bookReview.thumbnail || bookReview.book.thumbnail}
          />
        </s.PublishInfoItem>
        <s.PublishInfoItem>
          <s.Label>????????????</s.Label>
          <CategoryModal.Button
            modalKey={ModalKey.CATEGORY}
            handleClickCategory={setCategory}
          />
        </s.PublishInfoItem>
        <s.PublishInfoItem>
          <s.Label>??????</s.Label>
          <Rating
            size={17}
            gap={4}
            init={bookReview.rating}
            handleClickRating={setRating}
          />
        </s.PublishInfoItem>
        <s.PublishInfoItem>
          <s.Label>??????</s.Label>
          <TagInput initTagList={bookReview.tag} handleUpdate={setTag} />
        </s.PublishInfoItem>
        <s.ButtonWrapper>
          <DraftSaveButton />
          <Button
            variant={ButtonVariant.OUTLINED}
            color={ColorVariant.PRIMARY}
            onClick={handlePublish}
          >
            ??????
          </Button>
        </s.ButtonWrapper>
      </s.Wrapper>
    </SideBar>
  );
};

const PublishSidebarButton = () => {
  const { anchorEl, handleOpen, handleClose } = useOpenClose();

  return (
    <>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.PRIMARY}
        onClick={handleOpen}
      >
        ??????
      </Button>
      <PublishSideBar anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

PublishSideBar.Button = PublishSidebarButton;

export default PublishSideBar;
