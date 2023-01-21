import { MouseEvent, useState } from 'react';

const useDropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuToggle = (e: MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      handleMenuClose();
      return;
    }
    handleMenuOpen(e);
  };

  return { anchorEl, handleMenuOpen, handleMenuClose, handleMenuToggle };
};

export default useDropdownMenu;
