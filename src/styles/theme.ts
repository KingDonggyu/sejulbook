import { Nanum_Myeongjo, Noto_Sans_KR } from '@next/font/google';

const nanumMyeongjo = Nanum_Myeongjo({
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['korean'],
  fallback: ['sans-serif'],
});

const notoSansKR = Noto_Sans_KR({
  display: 'swap',
  weight: ['400', '500'],
  subsets: ['korean'],
  fallback: ['system-ui'],
});

const fontFamily = {
  notoSansKR: notoSansKR.style.fontFamily,
  nanumMyeongjo: nanumMyeongjo.style.fontFamily,
};

const maxWidth = {
  DEFAULT: '1024px',
  CONTENT: '800px',
  TABLET: '768px',
  POST: '720px',
  MOBILE: '480px',
};

const fontSize = {
  EXTRA_SMALL: '1rem',
  SMALL: '1.2rem',
  MEDIUM: '1.4rem',
  LARGE: '1.6rem',
  EXTRA_LARGE: '2rem',
  DISPLAY: '2.4rem',
};

const fontWeight = {
  NORMAL: 400,
  BOLD: 500,
  MYEONGJO_BOLD: 700,
};

const thumbnail = {
  DEFAULT: {
    W: 230,
    H: 300,
  },
  TABLET: {
    W: 140,
    H: 210,
  },
  MEDIUM: {
    W: 120,
    H: 174,
  },
  MOBILE: {
    W: 100,
    H: 150,
  },
  SMALL: {
    W: 60,
    H: 90,
  },
};

const headerBarHeight = 50;

const color = {
  LIGHT_GREEN: '#5AB890',
  WHITE: '#ffffff',
  WHITE2: '#F6F6F6',
  BLUE_WHITE: '#FAFBFC',
  BLACK: '#1E1F21',
  LIGHT_BLACK: '#292A2D',
  GREY: '#9a9ea3',
  LIGHT_GREY: '#E4E8EB',
  DEEP_GREY: '#3A3B3D',
  BROWN: '#B16464',
  RUBY: '#FF0062',
};

const lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.LIGHT_BLACK,
  SECOND_TEXT: color.GREY,
  BACKGROUND: color.BLUE_WHITE,
  BOX: color.WHITE,
  LINE: color.LIGHT_GREY,
  HOVER: color.WHITE2,
};

const darkModeColor: typeof lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.BLUE_WHITE,
  SECOND_TEXT: color.GREY,
  BACKGROUND: color.BLACK,
  BOX: color.LIGHT_BLACK,
  LINE: color.DEEP_GREY,
  HOVER: color.DEEP_GREY,
};

const commonTheme = {
  COLOR: color,
  MAX_WIDTH: maxWidth,
  FONT_SIZE: fontSize,
  FONT_WEIGHT: fontWeight,
  FONT_FAMILY: fontFamily,
  TUMBNAIL: thumbnail,
  HEADERBAR_HEIGHT: headerBarHeight,
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
