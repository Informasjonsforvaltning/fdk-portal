import React, { ComponentType, FC, memo, PropsWithChildren } from 'react';

import SC from './styled';
import { Entity } from '../../types/enums';
import DatasetIcon from '../../images/icon-catalog-dataset-md.svg';
import ApiIcon from '../../images/icon-catalog-api-md.svg';
import ConceptIcon from '../../images/icon-catalog-concept-md.svg';
import InfomodIcon from '../../images/icon-catalog-infomod-md.svg';

interface Props {
  variant?: Entity;
  active: boolean;
  label: string;
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

const Tab: FC<PropsWithChildren<Props>> = ({
  variant,
  active,
  label,
  as,
  ...props
}) => (
  <SC.Tab
    variant={variant}
    as={as}
    active={active}
    aria-label={label}
    {...props}
  >
    <SC.Icon variant={variant}>
      {variant === Entity.DATASET && <DatasetIcon />}
      {variant === Entity.DATA_SERVICE && <ApiIcon />}
      {variant === Entity.CONCEPT && <ConceptIcon />}
      {variant === Entity.INFORMATION_MODEL && <InfomodIcon />}
    </SC.Icon>
    <SC.Label>{label}</SC.Label>
  </SC.Tab>
);

export default memo(Tab);
export { Entity as Variant };
