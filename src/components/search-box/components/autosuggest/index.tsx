import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useEffect,
  useState
} from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SC from './styled';
import withcachedSuggestions, {
  Props as cachedSuggestionsProps
} from '../../../with-suggestions';
import { getConfig } from '../../../../config';
import { getTranslateText } from '../../../../lib/translateText';
import SearchForm from '../search-form/search-form.component';
import type { SearchSuggestion } from '../../../../types';
import { setSearchText } from '../../../../pages/search-page/search-location-helper';
import { Entity } from '../../../../types/enums';

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
        <strong>{resultString.substring(0, startHighlightIndex)}</strong>
        {resultString.substring(startHighlightIndex, endHighlightIndex)}
        <strong>
          {resultString.substring(endHighlightIndex, resultString.length)}
        </strong>
      </span>
    );
  }
  return <span>{resultString}</span>;
};

const renderIcon = (index: Entity) => {
  switch (index) {
    case Entity.DATA_SERVICE:
      return <SC.DataServiceIcon />;
    case Entity.INFORMATION_MODEL:
      return <SC.InfomodelIcon />;
    case Entity.CONCEPT:
      return <SC.ConceptIcon />;
    case Entity.EVENT:
      return <SC.EventIcon />;
    case Entity.PUBLIC_SERVICE:
      return <SC.PublicServiceIcon />;
    case Entity.DATASET:
    default:
      return <SC.DatasetIcon />;
  }
};

interface ExternalProps {
  placeholder: string;
}

interface Props
  extends ExternalProps,
    cachedSuggestionsProps,
    RouteComponentProps {}

const AutosuggestSearchBar: FC<Props> = ({
  placeholder,
  cachedSuggestions,
  searchSuggestionsActions: {
    getSearchSuggestionsRequested: getcachedSuggestions,
    resetSearchSuggestions
  },
  location,
  history
}) => {
  const isNap = getConfig().filterTransportDatasets;
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const [openSuggestions, setOpenSuggestions] = useState(true);
  const [searchString, setSearchString] = useState('');
  const searchSuggestions = cachedSuggestions?.[searchString] ?? [];

  useEffect(() => {
    resetSearchSuggestions();
  }, [location.pathname]);

  useEffect(
    () => () => {
      resetSearchSuggestions();
    },
    []
  );

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    if (!cachedSuggestions?.[e.target.value] && e.target.value.length > 1) {
      getcachedSuggestions(e.target.value, isNap, location.pathname);
    }
  };

  const handleKeyPressed = (e: KeyboardEvent) => {
    const focusedSuggestion = searchSuggestions?.[focusedSuggestionIndex];
    const focusedSuggestionLabel =
      getTranslateText(focusedSuggestion?.title) ?? '';

    setOpenSuggestions(true);
    switch (e.key) {
      case 'ArrowUp':
        setFocusedSuggestionIndex(Math.max(focusedSuggestionIndex - 1, -1));
        break;
      case 'ArrowDown':
        setFocusedSuggestionIndex(
          (focusedSuggestionIndex + 1) % (searchSuggestions.length ?? 0)
        );
        break;
      case 'Enter':
        setOpenSuggestions(false);
        if (focusedSuggestion) {
          e.preventDefault();
          setSearchString(focusedSuggestionLabel);
          setSearchText(history, location, focusedSuggestionLabel);
        }
        break;
      case 'Escape':
        setOpenSuggestions(false);
        setFocusedSuggestionIndex(-1);
        break;
      default:
        setFocusedSuggestionIndex(-1);
        break;
    }
  };

  const renderSuggestions = (suggestionsList?: SearchSuggestion[]) =>
    suggestionsList?.map((suggestion, index) => {
      const labelString = getTranslateText(suggestion.title) ?? '';
      return (
        <SC.Suggestion
          $highlighted={index === focusedSuggestionIndex}
          tabIndex={0}
          onMouseOver={() => setFocusedSuggestionIndex(index)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setSearchString(labelString);
              setOpenSuggestions(false);
              setSearchText(history, location, labelString);
            }
          }}
          onClick={() => {
            setSearchString(labelString);
            setOpenSuggestions(false);
            setSearchText(history, location, labelString);
          }}
        >
          {!isNap && renderIcon(suggestion?.searchType)}
          {highlightSearchString(searchString, labelString)}
        </SC.Suggestion>
      );
    });

  return (
    <SC.AutosuggestContainer>
      <SearchForm
        placeholder={placeholder}
        onChange={searchChange}
        onKeyDown={handleKeyPressed}
        onClick={() => setOpenSuggestions(true)}
      />
      {(searchSuggestions.length ?? 0) > 0 && openSuggestions && (
        <SC.SuggestionsContainer>
          <SC.SuggestionDivider />
          {renderSuggestions(searchSuggestions)}
        </SC.SuggestionsContainer>
      )}
    </SC.AutosuggestContainer>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withcachedSuggestions,
  withRouter
)(AutosuggestSearchBar);
