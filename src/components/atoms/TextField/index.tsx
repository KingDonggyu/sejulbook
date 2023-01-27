import { InputHTMLAttributes } from 'react';
import { StyleProps } from '@/types/style';
import { TextFieldVariant, ColorVariant, Alignment } from '@/constants';
import getColorByColorVariant from '@/utils/getColorByColorVariant';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import * as s from './style';

type TextFieldProps = {
  label?: string;
  alignment?: Alignment;
  variant?: TextFieldVariant;
  color?: ColorVariant;
} & InputHTMLAttributes<HTMLInputElement> &
  StyleProps;

const TextField = ({
  label,
  alignment = Alignment.COLUMN,
  variant = TextFieldVariant.OUTLINED,
  color = ColorVariant.PRIMARY,
  ...textFieldAttrs
}: TextFieldProps) => {
  const { theme } = useScreenModeContext();
  const InputComponent = (
    <s.TextField
      variant={variant}
      color={getColorByColorVariant(color, theme)}
      {...textFieldAttrs}
    />
  );

  return label ? (
    <s.Wrapper alignment={alignment}>
      <s.Label>{label}</s.Label>
      {InputComponent}
    </s.Wrapper>
  ) : (
    <> {InputComponent}</>
  );
};

export default TextField;
