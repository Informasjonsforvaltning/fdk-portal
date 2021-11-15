import React, {
  ChangeEvent,
  FC,
  FormEvent,
  HTMLAttributes,
  memo,
  PropsWithChildren,
  useCallback,
  useState
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { compose } from 'redux';
import SC from './styled';
import localization from '../../../../lib/localization';
import { parseSearchParams } from '../../../../lib/location-history-helper';
import { setSearchText } from '../../../../pages/search-page/search-location-helper';
import { PATHNAME_MAIN_PAGE } from '../../../../constants/constants';
import SearchIcon from '../../../../img/icon-search-lg.svg';

import { getTranslateText } from '../../../../lib/translateText';
import { SearchSuggestion } from '../../../../types';
import { getConfig } from '../../../../config';

interface ExternalProps {
  onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  suggestions?: SearchSuggestion[];
}
interface Props
  extends HTMLAttributes<HTMLElement>,
    RouteComponentProps,
    ExternalProps {}

const highlightSearchString = (searchString: string, resultString?: string) => {
  const startHighlightIndex = resultString
    ?.toLowerCase()
    ?.indexOf(searchString);

  if (startHighlightIndex != null && startHighlightIndex >= 0 && resultString) {
    const endHighlightIndex = startHighlightIndex + searchString.length;
    return (
      <>
        <strong>{resultString.substring(0, startHighlightIndex)}</strong>
        {resultString.substring(startHighlightIndex, endHighlightIndex)}
        <strong>
          {resultString.substring(endHighlightIndex, resultString.length)}
        </strong>
      </>
    );
  }
  return <span>{resultString}</span>;
};

const SearchForm: FC<PropsWithChildren<Props>> = ({
  history,
  location,
  suggestions,
  onChangeHandler
}) => {
  const isNap = getConfig().filterTransportDatasets;
  const locationSearch = parseSearchParams(location);
  const [searchQuery, setSearchQuery] = useState('');

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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (onChangeHandler) {
      onChangeHandler(event);
    }
  };

  const renderIcon = (index: string) => {
    switch (index) {
      case 'dataservices':
        return <SC.DataServiceIcon />;
      case 'informationmodels':
        return <SC.InfomodelIcon />;
      case 'concepts':
        return <SC.ConceptIcon />;
      case 'datasets':
      default:
        return <SC.DatasetIcon />;
    }
  };

  const renderSuggestions = (suggestionsList?: SearchSuggestion[]) =>
    suggestionsList?.map(suggestion => (
      <SC.Suggestion to={`/${suggestion.index}/${suggestion.id}`}>
        <span>
          {!isNap && renderIcon(suggestion.index)}
          {highlightSearchString(
            searchQuery,
            getTranslateText(suggestion.prefLabel ?? suggestion.title)
          )}
        </span>
      </SC.Suggestion>
    ));

  return (
    <SC.SearchForm onSubmit={onSearch} suggestionsOpen={!!suggestions?.length}>
      <label className='uu-invisible' htmlFor='searchBox'>
        {localization.query.intro}
      </label>
      <input
        aria-label={localization.query.intro}
        autoComplete='off'
        id='searchBox'
        placeholder={localization.query.intro}
        type='search'
        defaultValue={locationSearch.q?.toString() || ''}
        onChange={onChange}
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
      {suggestions?.length && (
        <SC.SuggestionsContainer>
          <SC.SuggestionDivider />
          {renderSuggestions(suggestions)}
        </SC.SuggestionsContainer>
      )}
    </SC.SearchForm>
  );
};

export default compose<FC<ExternalProps>>(memo, withRouter)(SearchForm);
