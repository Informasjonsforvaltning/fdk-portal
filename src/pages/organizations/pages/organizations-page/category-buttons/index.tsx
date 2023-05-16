import React, { FC, memo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SC from './styled';
import localization from '../../../../../lib/localization';

import ButtonToggleSC from './button-toggle/styled';

import {
  historyPushSearchParams,
  parseSearchParams
} from '../../../../../lib/location-history-helper';

const CategoryButtons: FC<RouteComponentProps> = ({ history, location }) => {
  const [category, setCategory] = useState(
    parseSearchParams(location).category
  );

  const getModifiedCategoryClickHandler = (changeToValue?: string) =>
    // eslint-disable-next-line func-names
    function () {
      setCategory(changeToValue);
      const searchParams = {
        category: changeToValue
      };
      historyPushSearchParams(history, searchParams);
    };

  return (
    <SC.SortButtons>
      <ButtonToggleSC.ButtonToggle
        onClick={getModifiedCategoryClickHandler(undefined)}
        selected={category === undefined}
        borderLeft
      >
        {category === undefined && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.all}
      </ButtonToggleSC.ButtonToggle>
      <ButtonToggleSC.ButtonToggle
        onClick={getModifiedCategoryClickHandler('state')}
        selected={category === 'state'}
      >
        {category === 'state' && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.state}
      </ButtonToggleSC.ButtonToggle>
      <ButtonToggleSC.ButtonToggle
        onClick={getModifiedCategoryClickHandler('municipality')}
        selected={category === 'municipality'}
        borderRight
      >
        {category === 'municipality' && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.municipality}
      </ButtonToggleSC.ButtonToggle>
    </SC.SortButtons>
  );
};

export default memo(withRouter(CategoryButtons));
