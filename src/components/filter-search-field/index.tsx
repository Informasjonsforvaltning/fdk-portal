import React, { memo, FC, useState, ChangeEventHandler } from 'react';
import { compose } from 'redux';
import ClearIcon from '../../images/clear-icon.svg';
import { FilterSearchOption } from '../../types';
import SC from './styled';

interface ExternalProps {
  value?: string;
  placeholder?: string;
  filterSearchOptions: FilterSearchOption[];
  onSelect: (value: string) => void;
}

interface Props extends ExternalProps {}

const highlightSearchString = (
  searchString: string,
  resultString?: string | null
) => {
  const startHighlightIndex = resultString
    ?.toLowerCase()
    ?.indexOf(searchString);

  if (startHighlightIndex != null && startHighlightIndex >= 0 && resultString) {
    const endHighlightIndex = startHighlightIndex + searchString.length;
    return (
      <span>
        {resultString.substring(0, startHighlightIndex)}
        <strong>
          {resultString.substring(startHighlightIndex, endHighlightIndex)}
        </strong>
        {resultString.substring(endHighlightIndex, resultString.length)}
      </span>
    );
  }
  return <span>{resultString}</span>;
};

const FilterSearchField: FC<Props> = ({
  filterSearchOptions,
  value,
  placeholder,
  onSelect
}) => {
  const [inputValue, setInputValue] = useState(value ?? '');

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
  };

  const clear = () => {
    setInputValue('');
  };

  const visibleOptions = !inputValue
    ? []
    : filterSearchOptions
        .filter(({ label }) =>
          label.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 5);

  return (
    <SC.TextField>
      <SC.Input
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />

      {visibleOptions && visibleOptions.length > 0 && (
        <SC.Options>
          {visibleOptions.map(({ value: optionValue, label }) => (
            <li>
              <button
                type='button'
                tabIndex={0}
                onClick={() => {
                  setInputValue('');
                  onSelect(optionValue);
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    setInputValue('');
                    onSelect(optionValue);
                  }
                }}
              >
                {highlightSearchString(inputValue, label)}
              </button>
            </li>
          ))}
        </SC.Options>
      )}

      <SC.ClearButton type='reset' onClick={clear}>
        <ClearIcon />
      </SC.ClearButton>
    </SC.TextField>
  );
};

export default compose<FC<ExternalProps>>(memo)(FilterSearchField);
