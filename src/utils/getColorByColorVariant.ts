import { Theme } from '@emotion/react';
import { ColorVariant } from '@/constants';

const getColorByColorVariant = (colorVariant: ColorVariant, theme: Theme) => {
  switch (colorVariant) {
    case ColorVariant.PRIMARY:
      return theme.COLOR.PRIMARY;
    case ColorVariant.SECONDARY:
      return theme.COLOR.SECOND_TEXT;
    case ColorVariant.LINE:
      return theme.COLOR.LINE;
    default:
      return theme.COLOR.TEXT;
  }
};

export default getColorByColorVariant;
