import React, {
  FC,
  useRef,
  useEffect,
  PropsWithChildren,
  HTMLAttributes,
  Children,
  isValidElement
} from 'react';

import SC from './styled';

import Trigger from '../trigger';
import Menu from '../menu';

interface Props extends HTMLAttributes<HTMLElement> {
  /**
   * A flag indicating whether dropdown menu is open
   * @type {boolean}
   */
  isOpen: boolean;
  /**
   * Dropdown menu close handler
   * @callback CloseHandler
   * @type {CloseHandler}
   */
  onClose: () => void;
}

const DropdownMenu: FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  children,
  ...props
}) => {
  const dropdownMenuElement = useRef<HTMLElement | null>(null);

  const triggerChild = Children.map(children, child =>
    isValidElement(child) && child.type === Trigger ? child : null
  )?.shift();
  const menuChild = Children.map(children, child =>
    isValidElement(child) && child.type === Menu ? child : null
  )?.shift();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    e.stopPropagation();

    if (!dropdownMenuElement.current?.contains(e.target as Node)) {
      onClose();
    }
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
    <SC.DropdownMenu {...props} ref={dropdownMenuElement}>
      <SC.Trigger onClick={isOpen ? onClose : undefined}>
        {triggerChild}
      </SC.Trigger>
      {isOpen && <SC.Menu>{menuChild}</SC.Menu>}
    </SC.DropdownMenu>
  );
};

export default DropdownMenu;
