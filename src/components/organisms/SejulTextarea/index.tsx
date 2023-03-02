import { ChangeEvent } from 'react';
import Image from 'next/image';
import TextArea from '@/components/atoms/TextArea';
import quotesLeftSrc from '@public/images/icon-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-quotes-right.svg';
import bookReviewStore from '@/stores/bookReviewStore';
import { TextFieldVariant } from '@/constants';
import * as s from './style';

interface SejulTextAreaProps {
  value?: string;
  readonly?: boolean;
}

const SejulTextArea = ({ value, readonly = false }: SejulTextAreaProps) => {
  const { setSejul } = bookReviewStore();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSejul(e.target.value);
  };

  return (
    <s.Wrapper>
      <Image src={quotesLeftSrc} alt="왼쪽 큰따옴표 아이콘" />
      {readonly ? (
        <s.Viewer>{value}</s.Viewer>
      ) : (
        <TextArea
          variant={TextFieldVariant.TEXT}
          css={s.textAreaStyle}
          onChange={handleChange}
          placeholder="세 줄 독후감 작성"
        />
      )}
      <Image src={quotesRightSrc} alt="오른쪽 큰따옴표 아이콘" />
    </s.Wrapper>
  );
};

export default SejulTextArea;
