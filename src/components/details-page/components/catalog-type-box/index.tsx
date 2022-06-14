import React, { FC, memo, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { themeFDK } from '../../../../app/theme';
import { Entity } from '../../../../types/enums';

import DatasetIcon from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIcon from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIcon from '../../../../images/icon-catalog-concept-lg.svg';
import InformationModelIcon from '../../../../images/icon-catalog-infomod-lg.svg';
import PublicServiceIcon from '../../../../images/icon-catalog-service-lg.svg';

import SC from './styled';

interface Props {
  entity: Entity;
}

const CatalogTypeBox: FC<PropsWithChildren<Props>> = ({ entity, children }) => {
  const entityDetails = {
    [Entity.DATASET]: {
      icon: DatasetIcon
    },
    [Entity.DATA_SERVICE]: {
      icon: ApiIcon
    },
    [Entity.CONCEPT]: {
      icon: ConceptIcon
    },
    [Entity.INFORMATION_MODEL]: {
      icon: InformationModelIcon
    },
    [Entity.PUBLIC_SERVICE]: {
      icon: PublicServiceIcon
    },
    [Entity.EVENT]: {
      icon: PublicServiceIcon
    }
  };

  const { icon: Icon } = entityDetails[entity];
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  return (
    <ThemeProvider theme={theme}>
      <SC.CatalogTypeBox>
        <Icon />
        <SC.Content>{children}</SC.Content>
      </SC.CatalogTypeBox>
    </ThemeProvider>
  );
};

export default memo(CatalogTypeBox);
