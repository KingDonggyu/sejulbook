import theme from '@/styles/theme';

export const Color = {
  INHERIT: theme.COLOR.TEXT,
  PRIMARY: theme.COLOR.PRIMARY,
  ERROR: 'error',
  WARNING: 'warning',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Color = (typeof Color)[keyof typeof Color];

export enum ButtonVariant {
  TEXT = 'text',
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
}
