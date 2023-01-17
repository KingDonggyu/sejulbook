import { ModalProvider } from '@/contexts/modalContext';

import * as s from './style';

const LoginModal = () => (
  <ModalProvider css={s.modalStyle}>
    <s.Title>
      <span>세</span> 줄 독후감 시작하기
    </s.Title>
    <s.EasyLoginDivider />
    <s.EasyLoginText>간편 로그인</s.EasyLoginText>
  </ModalProvider>
);

export default LoginModal;
