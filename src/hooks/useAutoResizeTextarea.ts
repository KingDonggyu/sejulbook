import { ChangeEvent, useEffect, useRef, useState } from 'react';

const useAutoResizeTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setTextareaValue] = useState(
    textareaRef.current?.value,
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  useEffect(() => {
    if (!textareaRef || !textareaRef.current) {
      return;
    }
    textareaRef.current.style.height = '0px';
    const { scrollHeight } = textareaRef.current;
    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [textareaRef, textareaValue]);

  return { textareaRef, handleChange };
};

export default useAutoResizeTextarea;
