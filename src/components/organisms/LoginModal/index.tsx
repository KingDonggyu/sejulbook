import Box from '@/components/atoms/Box';
import Modal from '@/components/molecules/Modal';
import * as s from './style';

const LoginModal = () => (
  <Modal>
    <Box css={s.boxStyle}>
      <s.Title>
        <span>세</span> 줄 독후감 시작하기
      </s.Title>
      <s.EasyLoginDivider />
      <s.EasyLoginText>간편 로그인</s.EasyLoginText>
    </Box>
  </Modal>
);

export default LoginModal;
