import { ReactNode, UIEvent, useEffect, useRef, useState } from 'react';
import { HiOutlineArrowLeft } from '@react-icons/all-files/hi/HiOutlineArrowLeft';
import { HiOutlineArrowRight } from '@react-icons/all-files/hi/HiOutlineArrowRight';
import Button from '@/components/atoms/Button';
import { StyleProps } from '@/types/style';
import { iconButtonStyle } from '@/styles/common';
import * as s from './style';

interface CardScollerProps extends StyleProps {
  gap?: number;
  children: ReactNode;
}

const CardScoller = ({
  gap = 20,
  children,
  ...styleProps
}: CardScollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [isVisiblePrevButton, setIsVisiblePrevButton] = useState(false);
  const [isVisibleNextButton, setIsVisibleNextButton] = useState(false);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!e.currentTarget.scrollLeft && !!isVisiblePrevButton) {
      setIsVisiblePrevButton(false);
      return;
    }

    if (!isVisiblePrevButton) {
      setIsVisiblePrevButton(true);
    }
  };

  const handleClickArrowButton = (type: 'prev' | 'next') => {
    const scrollDistance = cardWidth + gap;

    if (type === 'prev') {
      scrollRef.current?.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth',
      });

      return;
    }

    scrollRef.current?.scrollBy({
      left: scrollDistance,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;

    if (!scrollEl) {
      return;
    }

    if (scrollEl.clientWidth < scrollEl.scrollWidth) {
      setIsVisibleNextButton(true);
    }

    if (scrollEl.firstElementChild) {
      setCardWidth(scrollEl.firstElementChild.clientWidth);
    }
  }, []);

  return (
    <s.Wrapper>
      {isVisiblePrevButton && (
        <Button radius={50} style={{ left: '30px' }} css={iconButtonStyle}>
          오른쪽 슬라이드 버튼
          <HiOutlineArrowLeft
            size={70}
            onClick={() => handleClickArrowButton('prev')}
          />
        </Button>
      )}
      <s.Scoller
        ref={scrollRef}
        gap={gap}
        onScroll={handleScroll}
        {...styleProps}
      >
        {children}
      </s.Scoller>
      {isVisibleNextButton && (
        <Button radius={50} style={{ right: '30px' }} css={iconButtonStyle}>
          왼쪽 슬라이드 버튼
          <HiOutlineArrowRight
            size={70}
            onClick={() => handleClickArrowButton('next')}
          />
        </Button>
      )}
    </s.Wrapper>
  );
};

export default CardScoller;
