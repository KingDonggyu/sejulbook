import { ImQuotesLeft } from '@react-icons/all-files/im/ImQuotesLeft';
import { ImQuotesRight } from '@react-icons/all-files/im/ImQuotesRight';
import Box from '@/components/atoms/Box';
import { BoxVariant } from '@/constants';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

const SejulTextarea = () => (
  <s.Wrapper>
    <ImQuotesLeft size={30} color={lightTheme.COLOR.SECOND_TEXT} />
    <Box variant={BoxVariant.OUTLINED} css={s.boxStyle}>
      <s.Textarea rows={5} placeholder="세 줄 독후감을 작성해주세요." />
    </Box>
    <ImQuotesRight size={30} color={lightTheme.COLOR.SECOND_TEXT} />
  </s.Wrapper>
);

export default SejulTextarea;
