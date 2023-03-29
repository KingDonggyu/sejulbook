import { css, Theme } from '@emotion/react';

const footerStyle = (theme: Theme) => css`
  padding: 40px 0;
  text-align: center;
  color: ${theme.COLOR.SECOND_TEXT};
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    padding-bottom: 70px;
  }
`;

const Footer = () => (
  <footer css={footerStyle}>© 2023 Sejulbook. All rights reserved.</footer>
);

export default Footer;
