import React, {
  memo,
  FC,
  useState,
  useRef,
  useEffect,
  PropsWithChildren
} from 'react';

import SC from './styled';

interface Props {
  title: string;
  caret: boolean;
  desktopView: boolean;
  mobileView: boolean;
  openOnHover?: boolean;
}

const DropdownMenu: FC<PropsWithChildren<Props>> = ({
  title,
  caret,
  desktopView,
  mobileView,
  openOnHover = false,
  children
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    } else {
      event.preventDefault();
    }
  };

  const handleMouseEvent = () => {
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
        role='navigation'
        ref={ref}
        onClick={openOnHover ? () => {} : handleMouseEvent}
        onMouseOver={openOnHover ? handleMouseEvent : () => {}}
        onMouseOut={openOnHover ? handleMouseEvent : () => {}}
        onFocus={() => setOpen(true)}
        desktopView={desktopView}
        mobileView={mobileView}
      >
        <SC.Title caret={caret}>{title}</SC.Title>
        <SC.Dropdown open={open}>{children}</SC.Dropdown>
      </SC.DropdownMenu>
    </>
  );
};

export default memo(DropdownMenu);
