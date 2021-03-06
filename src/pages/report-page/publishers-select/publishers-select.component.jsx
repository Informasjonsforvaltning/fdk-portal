import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import localization from '../../../lib/localization';
import './publishers-select.scss';

export function PublishersSelect({ publishers, value, onChange }) {
  const options = _.chain(publishers).values().sortBy('name').value();

  return (
    <div className='section fdk-report-search-publishers'>
      <div className='fdk-report-search-publishers__header mb-2'>
        {localization.report.searchPublisher}
      </div>
      <Select
        options={options}
        value={value}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ orgPath }) => orgPath}
        onChange={onChange}
        placeholder={localization.report.searchPublisherPlaceholder}
        searchPromptText={localization.report.typeToSearch}
        backspaceRemoves
      />
    </div>
  );
}

PublishersSelect.defaultProps = {
  onChange: null,
  value: null
};

PublishersSelect.propTypes = {
  publishers: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.object
};
