import React, { FC, ChangeEvent, useState, KeyboardEvent } from 'react';
import { Input, SearchField as StyledSearchField, SvgWrapper } from './styled';
import MagnifyingGlassSVG from './MagnifyingGlass.svg';

type IconPosType = 'left' | 'right';

interface SearchFieldProps {
  ariaLabel: string;
  placeholder?: string;
  error?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  onSearchSubmit?: (inputValue: string) => void | any;
  iconPos?: IconPosType;
}

const SearchField: FC<SearchFieldProps> = ({
  ariaLabel,
  startIcon,
  endIcon = <MagnifyingGlassSVG />,
  placeholder = 'Input placeholder ...',
  error = false,
  onSearchSubmit
}) => {
  const [inputValue, setInputValue] = useState('');
  const conditionalPlaceholder = error ? 'Invalid input' : placeholder;

  const onInput = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    setInputValue(changeEvent.target.value);

    if (onSearchSubmit && changeEvent.target.value === '') {
      onSearchSubmit('');
    }
  };

  const onSubmit = (event: KeyboardEvent<HTMLInputElement> | 'clicked') => {
    if (onSearchSubmit) {
      if (event === 'clicked' || event?.key === 'Enter') {
        onSearchSubmit(inputValue);
      }
    }
  };

  return (
    <StyledSearchField
      ariaLabel={ariaLabel}
      error={error}
      iconPos={startIcon ? 'left' : 'right'}
    >
      {startIcon}
      <Input
        aria-label={ariaLabel}
        placeholder={conditionalPlaceholder}
        type='search'
        value={inputValue}
        onInput={onInput}
        onKeyUp={onSubmit}
      />
      <SvgWrapper onClick={() => onSubmit('clicked')}>{endIcon}</SvgWrapper>
    </StyledSearchField>
  );
};

export { SearchField, type SearchFieldProps };
