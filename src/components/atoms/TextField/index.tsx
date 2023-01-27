import { InputHTMLAttributes, ReactNode } from 'react';
import { StyleProps } from '@/types/style';
import { TextFieldVariant, ColorVariant, Alignment } from '@/constants';
import getColorByColorVariant from '@/utils/getColorByColorVariant';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import * as s from './style';

type TextFieldProps = {
  label?: string;
  icon?: ReactNode;
  alignment?: Alignment;
  variant?: TextFieldVariant;
  color?: ColorVariant;
} & InputHTMLAttributes<HTMLInputElement> &
  StyleProps;

const TextField = ({
  label,
  icon,
  alignment = Alignment.COLUMN,
  variant = TextFieldVariant.OUTLINED,
  color = ColorVariant.PRIMARY,
  ...textFieldAttrs
}: TextFieldProps) => {
  const { theme } = useScreenModeContext();

  return (
    <s.Wrapper alignment={alignment}>
      {label && <s.Label>{label}</s.Label>}
      <s.TextFieldBorder
        hasIcon={Boolean(icon)}
        variant={variant}
        color={getColorByColorVariant(color, theme)}
      >
        {icon}
        <s.TextField {...textFieldAttrs} />
      </s.TextFieldBorder>
    </s.Wrapper>
  );
};

export default TextField;
