import { ReactNode } from 'react';
import { css } from '@emotion/react';

const mainStyle = ({
  isHome,
  isVisibleHeaderBar,
}: {
  isHome: boolean;
  isVisibleHeaderBar: boolean;
}) => css`
  margin: auto;
  padding: ${isVisibleHeaderBar ? `5rem 20px` : `20px`};
  ${isHome ? `padding: 0; padding-bottom: 5rem;` : `max-width: 80rem;`};
`;

interface MainContainerProps {
  isHome?: boolean;
  isVisibleHeaderBar?: boolean;
  children: ReactNode;
}

const MainContainer = ({
  isHome = false,
  isVisibleHeaderBar = true,
  children,
}: MainContainerProps) => (
  <main css={mainStyle({ isHome, isVisibleHeaderBar })}>{children}</main>
);

export default MainContainer;
