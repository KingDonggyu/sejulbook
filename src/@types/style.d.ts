import { CSSProperties } from 'react';
import { SerializedStyles, Theme } from '@emotion/react';

declare module 'emotion-props' {
  export type StyleProps = {
    style?: CSSProperties;
    css?: ((theme: Theme) => SerializedStyles) | SerializedStyles;
  };
}
