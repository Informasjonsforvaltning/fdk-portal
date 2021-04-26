import React from 'react';
import PropTypes from 'prop-types';
import localization from '../../../../lib/localization';

export const HitsStats = props => {
  const {
    countDatasets,
    countTerms,
    countApis,
    countInformationModels
  } = props;

  // Do not show anything if we don't have the stats yet
  if (
    countDatasets === null ||
    countTerms === null ||
    countApis === null ||
    countInformationModels === null
  ) {
    return null;
  }

  const nohits =
    countDatasets === 0 &&
    countApis === 0 &&
    countTerms === 0 &&
    countInformationModels === 0;

  let template;
  if (nohits) {
    template = localization.hitstats.nohits;
  } else {
    template = localization.hitstats.search;
  }

  const content = localization.formatString(
    template,
    countDatasets,
    countApis,
    countTerms,
    countInformationModels
  );

  return (
    <div data-qa='hits-stats'>
      <div data-qa='info'>{content}</div>
    </div>
  );
};

HitsStats.defaultProps = {
  countDatasets: 0,
  countTerms: 0,
  countApis: 0,
  countInformationModels: 0
};

HitsStats.propTypes = {
  countDatasets: PropTypes.number,
  countTerms: PropTypes.number,
  countApis: PropTypes.number,
  countInformationModels: PropTypes.number
};
