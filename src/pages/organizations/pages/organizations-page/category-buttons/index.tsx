import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SC from './styled';
import localization from '../../../../../lib/localization';

import ButtonToggleSC from './button-toggle/styled';

export interface Props extends RouteComponentProps {
  selectedCategory?: 'state' | 'municipality' | undefined;
  onCategoryChange: (category?: 'state' | 'municipality' | undefined) => void;
}

const CategoryButtons: FC<Props> = ({ selectedCategory, onCategoryChange }) => {
  const handleOnClick = (
    changeToValue?: 'state' | 'municipality' | undefined
  ) => {
    onCategoryChange(changeToValue);
  };

  return (
    <SC.CategoryButtons>
      <ButtonToggleSC.ButtonToggle
        onClick={() => handleOnClick(undefined)}
        selected={selectedCategory === undefined}
        borderLeft
      >
        {selectedCategory === undefined && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.all}
      </ButtonToggleSC.ButtonToggle>
      <ButtonToggleSC.ButtonToggle
        onClick={() => handleOnClick('state')}
        selected={selectedCategory === 'state'}
      >
        {selectedCategory === 'state' && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.state}
      </ButtonToggleSC.ButtonToggle>
      <ButtonToggleSC.ButtonToggle
        onClick={() => handleOnClick('municipality')}
        selected={selectedCategory === 'municipality'}
        borderRight
      >
        {selectedCategory === 'municipality' && <ButtonToggleSC.CheckIcon />}
        {localization.organizationsPage.category.municipality}
      </ButtonToggleSC.ButtonToggle>
    </SC.CategoryButtons>
  );
};

export default memo(withRouter(CategoryButtons));
