import { Theme } from '@emotion/react';
import { ColorVariant } from '@/constants';

const getColorByColorVariant = (colorVariant: ColorVariant, theme: Theme) => {
  switch (colorVariant) {
    case ColorVariant.PRIMARY:
      return theme.COLOR.PRIMARY;
    default:
      return theme.COLOR.TEXT;
  }
};

export default getColorByColorVariant;
