import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import localization from '../../../../lib/localization';
import './search-hit-item.scss';
import { getTranslateText } from '../../../../lib/translateText';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import { getLosStructure } from '../../../../redux/modules/referenceData';
import { SearchHitHeader } from '../../../../components/search-hit-header/search-hit-header.component';

const renderHeaderLink = (item, publisher, publishers) => {
  if (!item) {
    return null;
  }
  const { title } = item;
  const link = `/informationmodels/${encodeURIComponent(item.id)}`;

  return (
    <header>
      <SearchHitHeader
        tag="h2"
        title={getTranslateText(title)}
        titleLink={link}
        publisherLabel={`${localization.responsible}:`}
        publisher={publisher}
        publisherItems={publishers}
        nationalComponent={item.nationalComponent}
        darkThemeBackground={false}
      />
    </header>
  );
};

const renderThemes = (themes, losItems) => {
  const getContextRootLink = () => {
    const informationmodelsRoot = '/informationmodels';
    if (location.pathname.includes(informationmodelsRoot)) {
      return informationmodelsRoot;
    }
    return '/';
  };

  return themes
    .map(({ id, title }) => {
      const { uri, prefLabel, losPaths: [theme = ''] = [] } =
        Object.values(losItems).find(({ uri }) => uri === id) || {};
      return (
        uri &&
        theme && (
          <Link
            key={id}
            to={`${getContextRootLink()}${patchSearchQuery('losTheme', theme)}`}
            className="align-self-center mr-2 mb-2 fdk-label"
          >
            <span className="uu-invisible" aria-hidden="false">
              Imformasjonsmodell tema
            </span>
            {getTranslateText(prefLabel || title)}
          </Link>
        )
      );
    })
    .filter(Boolean);
};

export const SearchHitItem = ({
  item,
  fadeInCounter,
  publishers,
  referenceData
}) => {
  const searchHitClass = cx('search-hit', {
    'fade-in-200': fadeInCounter === 0,
    'fade-in-300': fadeInCounter === 1,
    'fade-in-400': fadeInCounter === 2
  });

  const losItems = getLosStructure(referenceData);

  const { publisher, description, themes = [] } = item || {};

  const informationModelDescription = getTranslateText(description) || '';

  return (
    <article className={searchHitClass}>
      <span className="uu-invisible" aria-hidden="false">
        Søketreff.
      </span>

      {renderHeaderLink(item, publisher, publishers)}

      {informationModelDescription && (
        <p className="fdk-text-size-medium">
          <span className="uu-invisible" aria-hidden="false">
            Beskrivelse av informasjonsmodellen
          </span>
          {`${informationModelDescription.substr(0, 220)}...`}
        </p>
      )}

      {themes.length > 0 && (
        <div className="mb-4 d-flex flex-wrap align-items-baseline align-items-center">
          {renderThemes(
            themes.map(({ uri: id }) => ({ id })),
            losItems
          )}
        </div>
      )}
    </article>
  );
};

SearchHitItem.defaultProps = {
  fadeInCounter: null,
  item: null,
  publishers: null
};

SearchHitItem.propTypes = {
  fadeInCounter: PropTypes.number,
  item: PropTypes.shape({}),
  publishers: PropTypes.object
};
