import React, { FC } from 'react';
import Moment from 'react-moment';

import localization from '../../lib/localization';

import './harvest-date.scss';

interface Props {
  harvest?: Record<string, any>;
}

export const HarvestDate: FC<Props> = ({ harvest }) =>
  harvest ? (
    <div className='d-flex flex-wrap'>
      {harvest?.firstHarvested && (
        <span className='d-flex flex-wrap align-self-center'>
          {localization.dataset.firstHarvested}&nbsp;
          <Moment format='DD.MM.YYYY'>{harvest.firstHarvested}</Moment>
          &nbsp;/&nbsp;
        </span>
      )}
      {harvest?.lastChanged && (
        <span className='d-flex flex-wrap align-self-center'>
          {localization.dataset.lastChanged}&nbsp;
          <Moment format='DD.MM.YYYY'>{harvest.lastChanged}</Moment>
        </span>
      )}
    </div>
  ) : null;
