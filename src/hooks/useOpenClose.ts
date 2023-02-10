import { ChangeEvent, MouseEvent, FocusEvent, useState } from 'react';

type Events =
  | MouseEvent<HTMLElement>
  | ChangeEvent<HTMLElement>
  | FocusEvent<HTMLElement>;

const useOpenClose = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (e: Events) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (e: Events) => {
    if (anchorEl) {
      handleClose();
      return;
    }
    handleOpen(e);
  };

  return {
    anchorEl,
    handleOpen,
    handleClose,
    handleToggle,
  };
};

export default useOpenClose;
