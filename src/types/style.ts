import { CSSProperties } from 'react';
import { SerializedStyles, Theme } from '@emotion/react';

export type StyleProps = {
  style?: CSSProperties;
  css?: ((theme: Theme) => SerializedStyles) | SerializedStyles;
};
