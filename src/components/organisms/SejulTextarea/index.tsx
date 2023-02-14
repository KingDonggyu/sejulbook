import { ChangeEvent } from 'react';
import Image from 'next/image';
import quotesLeftSrc from '@public/images/icon-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-quotes-right.svg';
import useAutoResizeTextarea from '@/hooks/useAutoResizeTextarea';
import bookReviewStore from '@/stores/bookReviewStore';
import * as s from './style';

interface SejulTextareaProps {
  value?: string;
  readonly?: boolean;
}

const SejulTextarea = ({ value, readonly = false }: SejulTextareaProps) => {
  const { setSejul } = bookReviewStore();
  const { textareaRef, handleChange: handleResize } = useAutoResizeTextarea();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSejul(e.target.value);
    handleResize(e);
  };

  return (
    <s.Wrapper>
      <Image src={quotesLeftSrc} alt="왼쪽 큰따옴표 아이콘" />
      {readonly ? (
        <s.Viewer>{value}</s.Viewer>
      ) : (
        <s.Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="세 줄 독후감 작성"
        />
      )}
      <Image src={quotesRightSrc} alt="오른쪽 큰따옴표 아이콘" />
    </s.Wrapper>
  );
};

export default SejulTextarea;
