import { useState } from 'react';
import { BsStar } from '@react-icons/all-files/bs/BsStar';
import { BsStarFill } from '@react-icons/all-files/bs/BsStarFill';
import { StyleProps } from '@/types/style';
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

  const handleClick = (clickedRating: number) => {
    if (readonly) {
      return;
    }

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
    <s.Wrapper readonly={readonly} gap={gap} onMouseLeave={handleMouseLeave}>
      {Array.from(Array(rating), (_, i) => (
        <BsStarFill
          key={i}
          size={size}
          color={activeColor}
          onClick={() => handleClick(i + 1)}
          onMouseOver={() => handleMouseOver(i + 1)}
        />
      ))}
      {Array.from(Array(max - rating), (_, i) => (
        <BsStar
          key={i}
          size={size}
          color={deactiveColor}
          onClick={() => handleClick(i + rating + 1)}
          onMouseOver={() => handleMouseOver(i + rating + 1)}
        />
      ))}
    </s.Wrapper>
  );
};

export default Rating;
