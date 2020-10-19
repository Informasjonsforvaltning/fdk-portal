import React, { memo, FC, useState, useRef, useEffect } from 'react';

import { DropdownMenuItem } from '../../types';

import MenuItem from './components/menu-item/index';

import SC from './styled';

interface Props {
  title: string;
  caret: boolean;
  menuItems: DropdownMenuItem[];
  desktopView: boolean;
  mobileView: boolean;
}

const DropdownMenu: FC<Props> = ({
  title,
  caret,
  menuItems,
  desktopView,
  mobileView
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    event.preventDefault();
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleClick = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setOpen(!open);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <SC.GlobalStyle dropdownOpen={open} />
      <SC.DropdownMenu
        role="navigation"
        ref={ref}
        onClick={handleClick}
        onFocus={() => setOpen(true)}
        desktopView={desktopView}
        mobileView={mobileView}
      >
        <SC.Title caret={caret}>{title}</SC.Title>
        <SC.Dropdown open={open}>
          {menuItems.map((menuItem, index) => (
            <MenuItem key={`menuItem_${index}`} content={menuItem} />
          ))}
        </SC.Dropdown>
      </SC.DropdownMenu>
    </>
  );
};

export default memo(DropdownMenu);
