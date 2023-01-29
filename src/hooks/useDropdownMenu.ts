import { ChangeEvent, MouseEvent, FocusEvent, useState } from 'react';

type Events =
  | MouseEvent<HTMLElement>
  | ChangeEvent<HTMLElement>
  | FocusEvent<HTMLElement>;

const useDropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: Events) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (_?: Events, isDelay = true) => {
    if (!isDelay) {
      setAnchorEl(null);
      return;
    }
    setTimeout(() => setAnchorEl(null), 100);
  };

  const handleMenuToggle = (e: Events) => {
    if (anchorEl) {
      handleMenuClose();
      return;
    }
    handleMenuOpen(e);
  };

  return { anchorEl, handleMenuOpen, handleMenuClose, handleMenuToggle };
};

export default useDropdownMenu;
