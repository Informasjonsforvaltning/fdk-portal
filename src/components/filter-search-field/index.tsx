import React, {
  memo,
  FC,
  useState,
  ChangeEventHandler,
  KeyboardEventHandler
} from 'react';
import { compose } from 'redux';
import localization from '../../lib/localization';
import ClearIcon from '../../images/clear-icon.svg';
import SC from './styled';

interface ExternalProps {
  value?: string;
  placeholder?: string;
  buttonText?: string;
  onClick: (value: string) => void;
}

interface Props extends ExternalProps {}

const FilterSearchField: FC<Props> = ({
  value,
  placeholder,
  buttonText,
  onClick
}) => {
  const [inputValue, setInputValue] = useState(value ?? '');

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      onClick(inputValue);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
  };

  const clear = () => {
    setInputValue('');
    onClick('');
  };

  return (
    <SC.TextField>
      <SC.Input
        type='text'
        value={inputValue}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
      />
      <SC.SearchButton type='button' onClick={() => onClick(inputValue)}>
        {buttonText ?? localization.facet.search}
      </SC.SearchButton>
      <SC.ClearButton type='reset' onClick={clear}>
        <ClearIcon />
      </SC.ClearButton>
    </SC.TextField>
  );
};

export default compose<FC<ExternalProps>>(memo)(FilterSearchField);
