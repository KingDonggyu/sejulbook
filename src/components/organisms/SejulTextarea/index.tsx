import Image from 'next/image';
import quotesLeftSrc from '@public/images/icon-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-quotes-right.svg';
import useAutoResizeTextarea from '@/hooks/useAutoResizeTextarea';
import * as s from './style';

const SejulTextarea = () => {
  const { textareaRef, handleChange } = useAutoResizeTextarea();

  return (
    <s.Wrapper>
      <Image src={quotesLeftSrc} alt="왼쪽 큰따옴표 아이콘" />
      <s.Textarea
        ref={textareaRef}
        onChange={handleChange}
        placeholder="세 줄 독후감 작성"
      />
      <Image src={quotesRightSrc} alt="오른쪽 큰따옴표 아이콘" />
    </s.Wrapper>
  );
};

export default SejulTextarea;
