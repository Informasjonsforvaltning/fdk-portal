import React, { FC, ChangeEventHandler } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import localization from '../../../lib/localization';
import './publishers-select.scss';

interface Props {
  publishers: any;
  onChange?: ChangeEventHandler;
  value?: Record<string, any>;
}

export const PublishersSelect: FC<Props> = ({
  publishers,
  value,
  onChange
}) => (
  <div className='section fdk-report-search-publishers'>
    <div className='fdk-report-search-publishers__header mb-2'>
      {localization.report.searchPublisher}
    </div>
    <Select
      options={_.chain(publishers).values().sortBy('name').value()}
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
