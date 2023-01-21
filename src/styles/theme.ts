import { Nanum_Myeongjo, Noto_Sans_KR } from '@next/font/google';

const nanumMyeongjo = Nanum_Myeongjo({
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['korean'],
  fallback: ['serif'],
});

const notoSansKR = Noto_Sans_KR({
  display: 'swap',
  weight: ['300', '400', '500'],
  subsets: ['korean'],
});

const fontFamily = {
  notoSansKR: notoSansKR.style.fontFamily,
  nanumMyeongjo: nanumMyeongjo.style.fontFamily,
};

const maxWidth = {
  DEFAULT: '1024px',
  MOBILE: '480px',
};

const fontSize = {
  EXTRA_SMALL: '1rem',
  SMALL: '1.2rem',
  MEDIUM: '1.5rem',
  LARGE: '1.8rem',
};

const fontWeight = {
  LIGHT: 300,
  NORMAL: 400,
  BOLD: 700,
};

const color = {
  LIGHT_GREEN: '#5AB890',
  WHITE: '#FCFCFC',
  BLUE_WHITE: '#FAFBFC',
  BLACK: '#1E1F21',
  LIGHT_BLACK: '#292A2D',
  GREY: '#abb0b5',
  LIGHT_GREY: '#E4E8EB',
  DEEP_GREY: '#3A3B3D',
};

const lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.LIGHT_BLACK,
  SECOND_TEXT: color.GREY,
  BACKGROUND: color.BLUE_WHITE,
  BOX: color.WHITE,
  LINE: color.LIGHT_GREY,
};

const darkModeColor: typeof lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.BLUE_WHITE,
  SECOND_TEXT: color.GREY,
  BACKGROUND: color.BLACK,
  BOX: color.LIGHT_BLACK,
  LINE: color.DEEP_GREY,
};

const commonTheme = {
  COLOR: color,
  MAX_WIDTH: maxWidth,
  FONT_SIZE: fontSize,
  FONT_WEIGHT: fontWeight,
  FONT_FAMILY: fontFamily,
};

const lightTheme = {
  ...commonTheme,
  COLOR: {
    ...commonTheme.COLOR,
    ...lightModeColor,
  },
};

const darkTheme = {
  ...commonTheme,
  COLOR: {
    ...commonTheme.COLOR,
    ...darkModeColor,
  },
};

export { lightTheme, darkTheme };
