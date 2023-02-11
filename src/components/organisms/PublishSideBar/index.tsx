import { useState } from 'react';
import Button from '@/components/atoms/Button';
import SideBar from '@/components/molecules/SideBar';
import Rating from '@/components/molecules/Rating';
import TagInput from '@/components/molecules/TagInput';
import ThumbnailUploader from '@/components/organisms/ThumbnailUploader';
import CategoryModal from '@/components/organisms/CategoryModal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { error } from '@/constants/message';
import useOpenClose from '@/hooks/useOpenClose';
import { Book } from '@/types/domain/book';
import { PublishInfo } from '@/types/domain/bookReview';
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
  const [publishInfo, setPublishInfo] = useState<PublishInfo>({
    thumbnail: newbook.thumbnail,
    category: null,
    rating: 3,
    tag: new Set([]),
  });

  const handleComplete = () => {
    if (!publishInfo.thumbnail) {
      alert(error.PUBLISH_THUMBNAIL);
      return;
    }
    if (!publishInfo.category) {
      alert(error.PUBLISH_CATEGORY);
      return;
    }
    if (!publishInfo.rating) {
      alert(error.PUBLISH_RATING);
    }
  };

  return (
    <SideBar anchorEl={anchorEl} handleClose={handleClose}>
      <s.Wrapper>
        <div>
          <s.Label>책 표지 사진</s.Label>
          <s.ExplainText>* 대표 이미지로 사용됩니다.</s.ExplainText>
          <ThumbnailUploader
            thumbnail={newbook.thumbnail}
            handleChangeThumbnail={(thumbnail) => {
              setPublishInfo({ ...publishInfo, thumbnail });
            }}
          />
        </div>
        <div>
          <s.Label>카테고리</s.Label>
          <CategoryModal.Button
            handleClickCategory={(category) =>
              setPublishInfo({ ...publishInfo, category })
            }
          />
        </div>
        <div>
          <s.Label>평점</s.Label>
          <Rating
            size={17}
            gap={4}
            init={publishInfo.rating}
            handleClickRating={(rating) => {
              setPublishInfo({ ...publishInfo, rating });
            }}
          />
        </div>
        <div>
          <s.Label>태그</s.Label>
          <TagInput
            handleUpdate={(tag) => setPublishInfo({ ...publishInfo, tag })}
          />
        </div>
        <Button
          variant={ButtonVariant.OUTLINED}
          color={ColorVariant.PRIMARY}
          css={s.buttonStyle}
          onClick={handleComplete}
        >
          발행
        </Button>
      </s.Wrapper>
    </SideBar>
  );
};

const PublishButton = ({ newbook }: { newbook: Book }) => {
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

PublishSideBar.Button = PublishButton;

export default PublishSideBar;
