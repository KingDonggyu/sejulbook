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
  handleClickRating: (rating: number) => void;
} & StyleProps;

const Rating = ({
  size,
  gap = 0,
  max = 5,
  init = 3,
  activeColor = theme.COLOR.PRIMARY,
  deactiveColor = theme.COLOR.SECOND_TEXT,
  handleClickRating,
}: RatingProps) => {
  const [rating, setRating] = useState(init);
  const [selectedRating, setSelectedRating] = useState(max);

  const handleClick = (clickedRating: number) => {
    setSelectedRating(clickedRating);
    handleClickRating(clickedRating);
  };

  const handleMouseOver = (hoveredRating: number) => {
    setRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    setRating(selectedRating);
  };

  return (
    <s.Wrapper gap={gap} onMouseLeave={handleMouseLeave}>
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
