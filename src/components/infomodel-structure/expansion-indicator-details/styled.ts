import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import CollapseIconBase from '../../../images/icon-collapse-text-sm.svg';
import ExpandIconBase from '../../../images/icon-expand-text-sm.svg';

const CollapseIcon = styled(CollapseIconBase)`
  height: 16px;
  width: 16px;
  margin-right: ${theme.spacing('S8')};

  & > g {
    fill: ${theme.colour(Colour.VIOLET, 'V50')};
  }
`;

const ExpandIcon = styled(ExpandIconBase)`
  height: 16px;
  width: 16px;
  margin-right: ${theme.spacing('S8')};

  & > g {
    fill: ${theme.colour(Colour.VIOLET, 'V50')};
  }
`;

const IndicatorText = styled.span`
  color: ${theme.colour(Colour.VIOLET, 'V50')};
`;

export default { CollapseIcon, ExpandIcon, IndicatorText };
