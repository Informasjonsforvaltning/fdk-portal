import React, { FC, memo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SC from './styled';
import localization from '../../../../../lib/localization';

import ButtonToggleSC from './button-toggle/styled';

import {
  historyPushSearchParams,
  parseSearchParams
} from '../../../../../lib/location-history-helper';

export interface Props extends RouteComponentProps {
  onCategoryChange: (category?: string) => void;
}

const CategoryButtons: FC<Props> = ({
  history,
  location,
  onCategoryChange
}) => {
  const [category, setCategory] = useState(
    parseSearchParams(location).category
  );

  const handleOnClick = (changeToValue?: string) => {
    setCategory(changeToValue);
    const searchParams = {
      category: changeToValue
    };
    historyPushSearchParams(history, searchParams);
    onCategoryChange(changeToValue);
  };

  return (
    <SC.CategoryButtons>
      <ButtonToggleSC.ButtonToggle
        onClick={() => handleOnClick(undefined)}
        selected={category === undefined}
        borderLeft
      >
        {category === undefined && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.all}
      </ButtonToggleSC.ButtonToggle>
      <ButtonToggleSC.ButtonToggle
        onClick={() => handleOnClick('state')}
        selected={category === 'state'}
      >
        {category === 'state' && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.state}
      </ButtonToggleSC.ButtonToggle>
      <ButtonToggleSC.ButtonToggle
        onClick={() => handleOnClick('municipality')}
        selected={category === 'municipality'}
        borderRight
      >
        {category === 'municipality' && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.municipality}
      </ButtonToggleSC.ButtonToggle>
    </SC.CategoryButtons>
  );
};

export default memo(withRouter(CategoryButtons));
