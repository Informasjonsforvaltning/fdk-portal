import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { resolve } from 'react-resolver';
import {
  extractFirstConcept,
  paramsToSearchBody,
  searchConcepts
} from '../../../api/search-fulltext-api/concepts';
import { getTranslateText } from '../../../lib/translateText';

const memoizedSearchConcepts = _.memoize(searchConcepts);

const PureConceptBreadcrumb = props => {
  const { conceptItem } = props;
  return <span>{getTranslateText(_.get(conceptItem, 'prefLabel'))}</span>;
};

const mapProps = {
  conceptItem: props =>
    memoizedSearchConcepts(paramsToSearchBody({ id: props.match.params.id }))
      .then(extractFirstConcept)
      .catch(() => {})
};

PureConceptBreadcrumb.defaultProps = {
  conceptItem: null
};

PureConceptBreadcrumb.propTypes = {
  conceptItem: PropTypes.object
};

export const ConceptBreadcrumb = resolve(mapProps)(PureConceptBreadcrumb);
