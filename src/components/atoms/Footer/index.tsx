import Link from 'next/link';
import { css, Theme } from '@emotion/react';

const footerStyle = (theme: Theme) => css`
  margin: auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  padding: 40px 0;
  color: ${theme.COLOR.SECOND_TEXT};
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};

  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    padding-bottom: 70px;
  }

  a {
    color: ${theme.COLOR.TEXT};
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  }

  a:hover {
    border-bottom: 1px solid ${theme.COLOR.TEXT};
  }
`;

const Footer = () => (
  <footer css={footerStyle}>
    <p>
      © 2023{' '}
      <Link href="https://sejulbook.notion.site/62e31077c0934b989acaa6819ef9947a">
        Sejulbook
      </Link>
      . All rights reserved.
    </p>
    <p>Instagram: www.instagram.com/sejulbook</p>
  </footer>
);

export default Footer;
