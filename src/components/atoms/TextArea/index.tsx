import { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { StyleProps } from '@/types/style';
import useAutoResizeTextarea from '@/hooks/useAutoResizeTextarea';
import { Alignment, ColorVariant, TextFieldVariant } from '@/constants';
import getColorByColorVariant from '@/utils/getColorByColorVariant';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import * as s from './style';

type TextAreaProps = {
  label?: string;
  alignment?: Alignment;
  variant?: TextFieldVariant;
  color?: ColorVariant;
} & TextareaHTMLAttributes<HTMLTextAreaElement> &
  StyleProps;

const TextArea = ({
  label,
  alignment = Alignment.COLUMN,
  variant = TextFieldVariant.OUTLINED,
  color = ColorVariant.PRIMARY,
  onChange,
  ...textareaProps
}: TextAreaProps) => {
  const { theme } = useScreenModeContext();
  const { textareaRef, handleChange: handleResize } = useAutoResizeTextarea();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    handleResize(e);
  };

  return (
    <s.Wrapper alignment={alignment}>
      {label && <s.Label>{label}</s.Label>}
      <s.TextArea
        ref={textareaRef}
        variant={variant}
        onChange={handleChange}
        color={getColorByColorVariant(color, theme)}
        {...textareaProps}
      />
    </s.Wrapper>
  );
};

export default TextArea;
