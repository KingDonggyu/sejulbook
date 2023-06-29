/* eslint-disable @typescript-eslint/no-empty-interface */
import { CSSProperties } from 'react';
import { SerializedStyles } from '@emotion/react';
import { lightTheme } from '@/styles/theme';

type CustomTheme = typeof lightTheme;

declare module '@emotion/react' {
  interface Theme extends CustomTheme {}

  export type StyleProps = {
    style?: CSSProperties;
    css?: ((theme: Theme) => SerializedStyles) | SerializedStyles;
  };
}
