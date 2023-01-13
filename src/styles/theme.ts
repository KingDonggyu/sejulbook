const maxWidth = {
  DEFAULT: '1024px',
  MOBILE: '480px',
};

const color = {
  LIGHT_GREEN: '#5AB890',
  WHITE: '#FCFCFC',
  BLACK: '#3E3E3E',
  LIGHT_BLACK: '#4D4C4C',
  LIGHT_GREY: '#DADCE0',
};

const lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.BLACK,
  BACKGROUND: color.WHITE,
  LINE: color.LIGHT_GREY,
};

const darkModeColor: typeof lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.WHITE,
  BACKGROUND: color.BLACK,
  LINE: color.LIGHT_BLACK,
};

const commonTheme = {
  COLOR: color,
  MAX_WIDTH: maxWidth,
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
