const maxWidth = {
  DEFAULT: '1024px',
  MOBILE: '480px',
};

const color = {
  LIGHT_GREEN: '#5AB890',
  WHITE: '#FCFCFC',
  BLACK: '#3E3E3E',
  LIGHT_GREY: '#DADCE0',
};

const lightModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.BLACK,
  BACKGROUND: color.WHITE,
  LINE: color.LIGHT_GREY,
};

const darkModeColor = {
  PRIMARY: color.LIGHT_GREEN,
  TEXT: color.WHITE,
  BACKGROUND: color.BLACK,
};

const theme = {
  COLOR: { ...color, ...lightModeColor },
  MAX_WIDTH: maxWidth,
};

export default theme;
