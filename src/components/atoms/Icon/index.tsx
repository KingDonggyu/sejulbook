import { DOMAttributes } from 'react';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { FaRegComment } from '@react-icons/all-files/fa/FaRegComment';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { BsStar } from '@react-icons/all-files/bs/BsStar';
import { BsStarFill } from '@react-icons/all-files/bs/BsStarFill';
import { BsTrash } from '@react-icons/all-files/bs/BsTrash';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';

import { StyleProps } from '@/types/style';
import { lightTheme as theme } from '@/styles/theme';

type IconProps = { size?: number; color?: string } & DOMAttributes<SVGElement> &
  StyleProps;

interface ToogleIconProps extends IconProps {
  active?: boolean;
}

export const HeartIcon = ({
  size,
  active = false,
  ...styleProps
}: ToogleIconProps) =>
  active ? (
    <FaHeart size={size} color={theme.COLOR.RUBY} {...styleProps} />
  ) : (
    <FaRegHeart size={size} color={theme.COLOR.RUBY} {...styleProps} />
  );

export const CommentIcon = ({ size, color, ...styleProps }: IconProps) => (
  <FaRegComment size={size} color={color} {...styleProps} />
);

export const SearchIcon = ({ size, color, ...styleProps }: IconProps) => (
  <AiOutlineSearch size={size} color={color} {...styleProps} />
);

export const StarIcon = ({
  size,
  color,
  active = false,
  ...styleProps
}: ToogleIconProps) =>
  active ? (
    <BsStarFill size={size} color={color} {...styleProps} />
  ) : (
    <BsStar size={size} color={color} {...styleProps} />
  );

export const DeleteIcon = ({ size, color, ...styleProps }: IconProps) => (
  <BsTrash size={size} color={color} {...styleProps} />
);

export const EditIcon = ({ size, color, ...styleProps }: IconProps) => (
  <BsPencil size={size} color={color} {...styleProps} />
);
