import { useState } from 'react';
import type { StyleProps } from '@emotion/react';
import { StarIcon } from '@/components/atoms/Icon';
import useMobile from '@/hooks/useMobile';
import { lightTheme as theme } from '@/styles/theme';
import * as s from './style';

type RatingProps = {
  size?: number;
  gap?: number;
  max?: number;
  init?: number;
  activeColor?: string;
  deactiveColor?: string;
  readonly?: boolean;
  handleClickRating?: (rating: number) => void;
} & StyleProps;

const Rating = ({
  size,
  gap = 0,
  max = 5,
  init = 3,
  activeColor = theme.COLOR.PRIMARY,
  deactiveColor = theme.COLOR.SECOND_TEXT,
  readonly = false,
  handleClickRating,
}: RatingProps) => {
  const [rating, setRating] = useState(init);
  const [selectedRating, setSelectedRating] = useState(init);
  const isMobile = useMobile();

  const isBindingMouseEvent = !readonly && !isMobile;

  const handleClick = (clickedRating: number) => {
    if (readonly) {
      return;
    }

    setRating(clickedRating);
    setSelectedRating(clickedRating);

    if (handleClickRating) {
      handleClickRating(clickedRating);
    }
  };

  const handleMouseOver = (hoveredRating: number) => {
    if (!readonly) {
      setRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setRating(selectedRating);
    }
  };

  return (
    <s.Wrapper
      readonly={readonly}
      gap={gap}
      onMouseLeave={isBindingMouseEvent ? handleMouseLeave : undefined}
    >
      {Array.from(Array(rating), (_, i) => (
        <StarIcon
          active
          key={i}
          size={size}
          color={activeColor}
          onClick={() => handleClick(i + 1)}
          onMouseOver={
            isBindingMouseEvent ? () => handleMouseOver(i + 1) : undefined
          }
        />
      ))}
      {Array.from(Array(max - rating), (_, i) => (
        <StarIcon
          key={i}
          size={size}
          color={deactiveColor}
          onClick={() => handleClick(i + rating + 1)}
          onMouseOver={
            isBindingMouseEvent
              ? () => handleMouseOver(i + rating + 1)
              : undefined
          }
        />
      ))}
    </s.Wrapper>
  );
};

export default Rating;
