import { ReactNode, UIEvent, useEffect, useRef, useState } from 'react';
import { HiOutlineArrowLeft } from '@react-icons/all-files/hi/HiOutlineArrowLeft';
import { HiOutlineArrowRight } from '@react-icons/all-files/hi/HiOutlineArrowRight';
import Button from '@/components/atoms/Button';
import { StyleProps } from '@/types/style';
import * as s from './style';

interface CardScollerProps extends StyleProps {
  gap?: number;
  children: ReactNode;
}

const CardScoller = ({
  gap = 30,
  children,
  ...styleProps
}: CardScollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [isVisiblePrevButton, setIsVisiblePrevButton] = useState(false);

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
    if (scrollRef.current?.firstElementChild) {
      const { clientWidth } = scrollRef.current.firstElementChild;
      setCardWidth(clientWidth);
    }
  }, []);

  return (
    <s.Wrapper>
      {isVisiblePrevButton && (
        <Button radius={50} style={{ left: '30px' }}>
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
      <Button radius={50} style={{ right: '30px' }}>
        <HiOutlineArrowRight
          size={70}
          onClick={() => handleClickArrowButton('next')}
        />
      </Button>
    </s.Wrapper>
  );
};

export default CardScoller;
