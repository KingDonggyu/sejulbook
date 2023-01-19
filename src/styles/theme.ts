const maxWidth = {
  DEFAULT: '1024px',
  MOBILE: '480px',
};

const fontSize = {
  EXTRA_SMALL: '1rem',
  SMALL: '1.2rem',
  MEDIUM: '1.5rem',
  LARGE: '1.8rem',
} as const;

const color = {
  LIGHT_GREEN: '#5AB890',
  WHITE: '#FCFCFC',
  BLACK: '#3E3E3E',
  LIGHT_BLACK: '#4D4C4C',
  GREY: '#abb0b5',
  LIGHT_GREY: '#DADCE0',
  DEEP_GREY: '#999',
};

const lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.BLACK,
  SECOND_TEXT: color.GREY,
  BACKGROUND: color.WHITE,
  LINE: color.LIGHT_GREY,
};

const darkModeColor: typeof lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.WHITE,
  SECOND_TEXT: color.DEEP_GREY,
  BACKGROUND: color.BLACK,
  LINE: color.LIGHT_BLACK,
};

const commonTheme = {
  COLOR: color,
  MAX_WIDTH: maxWidth,
  FONT_SIZE: fontSize,
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
