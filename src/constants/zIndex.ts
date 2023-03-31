const base = 0;
const above = 1;
const below = -1;

export const THUMBNAIL_Z_INDEX = base;
export const NON_MODAL_Z_INDEX = base;
export const SCREEN_MODE_BUTTON_Z_INDEX = base + above;
export const MENU_Z_INDEX = SCREEN_MODE_BUTTON_Z_INDEX + above;
export const HEADER_Z_INDEX = MENU_Z_INDEX + above;
export const MODAL_Z_INDEX = HEADER_Z_INDEX + above;
export const SIDEBAR_Z_INDEX = HEADER_Z_INDEX + above;
export const LOADING_Z_INDEX = HEADER_Z_INDEX + below;
