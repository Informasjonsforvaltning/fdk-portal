import React, {
  FC,
  FormEvent,
  HTMLAttributes,
  memo,
  PropsWithChildren,
  useCallback,
  useState
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SC from './styled';
import localization from '../../../../lib/localization';
import { parseSearchParams } from '../../../../lib/location-history-helper';
import { setSearchText } from '../../../../pages/search-page/search-location-helper';
import { PATHNAME_MAIN_PAGE } from '../../../../constants/constants';
import SearchIcon from '../../../../img/icon-search-lg.svg';

interface Props extends HTMLAttributes<HTMLElement>, RouteComponentProps {}

const SearchForm: FC<PropsWithChildren<Props>> = ({ history, location }) => {
  const locationSearch = parseSearchParams(location);
  const [searchQuery, setSearchQuery] = useState(
    locationSearch.q?.toString() || ''
  );

  const onSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setSearchText(history, location, searchQuery);
    },
    [searchQuery]
  );

  function onClear(e: FormEvent) {
    e.preventDefault();
    setSearchQuery('');
    if (location.pathname !== PATHNAME_MAIN_PAGE) {
      setSearchText(history, location, '');
    }
  }

  return (
    <SC.SearchForm onSubmit={onSearch}>
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
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button
        aria-label={localization.query.reset}
        className='search-clear'
        type='button'
        onClick={onClear}
      >
        <SC.ClearIcon />
      </button>
      <button className='search-button' type='button' onClick={onSearch}>
        <img src={SearchIcon} alt={localization.query.do} />
        {localization.query.do}
      </button>
    </SC.SearchForm>
  );
};

export default withRouter(memo(SearchForm));
