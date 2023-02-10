import { ChangeEvent, MouseEvent, FocusEvent, useState } from 'react';

type Events =
  | MouseEvent<HTMLElement>
  | ChangeEvent<HTMLElement>
  | FocusEvent<HTMLElement>;

const useDropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (e: Events) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
