import React, { memo, FC } from 'react';
import { compose } from 'redux';

import translations from '../../../lib/localization';

import ListTitleSC from '../list-title/styled';
import SC from './styled';

interface ExternalProps {
  title: string;
  length?: number | null;
  maxLength?: number | null;
  minInclusive?: number | null;
  maxInclusive?: number | null;
  pattern?: number | null;
  totalDigits?: number | null;
}

interface Props extends ExternalProps {}

const ValueRestrictions: FC<Props> = ({
  title,
  length,
  maxLength,
  minInclusive,
  maxInclusive,
  pattern,
  totalDigits
}) => {
  const isDefined = (value: any) => value !== undefined && value !== null;
  const areSomeDefined = (values: any[]) => values.some(isDefined);

  const restrictions = [
    {
      name: translations.infoMod.restriction.valueLength,
      value: length
    },
    {
      name: translations.infoMod.restriction.maxLength,
      value: maxLength
    },
    {
      name: translations.infoMod.restriction.minInclusive,
      value: minInclusive
    },
    {
      name: translations.infoMod.restriction.maxInclusive,
      value: maxInclusive
    },
    {
      name: translations.infoMod.restriction.pattern,
      value: pattern
    },
    {
      name: translations.infoMod.restriction.totalDigits,
      value: totalDigits
    }
  ];

  return areSomeDefined(restrictions.map(({ value }) => value)) ? (
    <>
      <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
      {restrictions.map(
        ({ name, value }) =>
          isDefined(value) && (
            <SC.Restriction key={`restriction-${name}-${value}`}>
              <span>{name}</span>
              <span>{value}</span>
            </SC.Restriction>
          )
      )}
    </>
  ) : null;
};

export default compose<FC<ExternalProps>>(memo)(ValueRestrictions);
