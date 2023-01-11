import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { compose } from 'redux';
import SC from './styled';
import localization from '../../../../lib/localization';
import { parseSearchParams } from '../../../../lib/location-history-helper';
import { PATHNAME_MAIN_PAGE } from '../../../../constants/constants';
import SearchIcon from '../../../../img/icon-search-lg.svg';
import { setSearchText } from '../../../../pages/search-page/search-location-helper';

interface ExternalProps {
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
}
interface Props extends RouteComponentProps, ExternalProps {}

const SearchForm: FC<PropsWithChildren<Props>> = ({
  history,
  location,
  onChange: change,
  onKeyDown,
  onClick
}) => {
  const locationSearch = parseSearchParams(location);
  const [searchQuery, setSearchQuery] = useState(
    locationSearch.q?.toString() ?? ''
  );

  useEffect(() => {
    if (locationSearch.q?.toString()) {
      setSearchQuery(locationSearch.q?.toString());
    }
  }, [locationSearch.q?.toString()]);

  const onSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setSearchText(history, location, searchQuery);
    },
    [searchQuery]
  );

  const onClear = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery('');
    if (location.pathname !== PATHNAME_MAIN_PAGE) {
      setSearchText(history, location, '');
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (change) {
      change(event);
    }
  };

  return (
    <SC.SearchForm onSubmit={onSearch} role='search'>
      <label className='uu-invisible' htmlFor='searchBox'>
        {localization.query.intro}
      </label>

      <input
        aria-label={localization.query.intro}
        autoComplete='off'
        id='searchBox'
        placeholder={localization.query.intro}
        type='search'
        value={searchQuery}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
      />
      <button
        aria-label={localization.query.reset}
        title={localization.query.reset}
        name='reset'
        className='search-clear'
        type='button'
        onClick={onClear}
      >
        <SC.ClearIcon />
      </button>
      <button className='search-button' type='button' onClick={onSearch}>
        <img src={SearchIcon} alt='' />
        {localization.query.do}
      </button>
    </SC.SearchForm>
  );
};

export default compose<FC<ExternalProps>>(memo, withRouter)(SearchForm);
