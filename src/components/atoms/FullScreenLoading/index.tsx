import Image from 'next/image';
import styled from '@emotion/styled';
import ellipsisSrc from '@public/images/animation-ellipsis.svg';
import { LOADING_Z_INDEX } from '@/constants/zIndex';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${LOADING_Z_INDEX};
  background: ${({ theme }) => theme.COLOR.BACKGROUND};
`;

const FullScreenLoading = () => (
  <Wrapper>
    <Image
      priority
      src={ellipsisSrc}
      alt="로딩 이미지"
      width={80}
      height={80}
    />
  </Wrapper>
);

export default FullScreenLoading;
