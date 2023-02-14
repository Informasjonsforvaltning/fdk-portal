import _ from 'lodash';
import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import type { FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  ariaLabel?: string;
  title: string;
  titleLang?: string;
  chevron: boolean;
  mobileView: boolean;
  openOnHover?: boolean;
}

const DropdownMenu: FC<PropsWithChildren<Props>> = ({
  ariaLabel,
  title,
  titleLang,
  chevron,
  mobileView,
  openOnHover = false,
  children
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Enter') {
      setOpen(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (!mobileView) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      } else {
        event.preventDefault();
      }
    }
  };

  const handleMouseEvent = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setOpen(!open);
  };

  const handleBlur = useCallback(e => {
    if (!mobileView) {
      const { currentTarget } = e;
      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        // Check if the new focused element is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          setOpen(false);
        }
      });
    }
  }, []);

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
        aria-label={ariaLabel}
        id={_.uniqueId('dropdown-menu')}
        ref={ref}
        mobileView={mobileView}
        onClick={openOnHover ? () => {} : handleMouseEvent}
        onMouseOver={openOnHover ? handleMouseEvent : () => {}}
        onMouseOut={openOnHover ? handleMouseEvent : () => {}}
        onFocus={mobileView ? () => {} : () => setOpen(true)}
        onBlur={handleBlur}
      >
        <SC.ToggleButton
          aria-expanded={open}
          aria-controls={ref.current?.id}
          lang={titleLang}
        >
          {title}
          {mobileView && <SC.HamburgerMenuIcon />}
          {!mobileView && chevron && <SC.ChevronDownIcon />}
        </SC.ToggleButton>
        <SC.Dropdown open={open}>{children}</SC.Dropdown>
      </SC.DropdownMenu>
    </>
  );
};

export default memo(DropdownMenu);
