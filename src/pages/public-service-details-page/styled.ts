import styled from 'styled-components';
import { theme, Unit } from '@fellesdatakatalog/theme';

const ListItemValue = styled.div`
  margin-bottom: ${theme.spacing('S10')};
`;

const LightWeightLabel = styled.span`
  font-weight: ${theme.fontWeight('FW400')};
`;

const ListItemValueHeader = styled.div`
  font-weight: ${theme.fontWeight('FW500')};
  margin-bottom: ${theme.spacing('S10')};
`;

const KeyValueListHeader = styled.h3`
  font-size: ${theme.fontSize('FS20', Unit.REM)};
  font-weight: ${theme.fontWeight('FW500')};
  margin-bottom: ${theme.spacing('S10')};
  padding-top: ${theme.spacing('S16')};
`;

const KeyValueListSubHeader = styled.p`
  margin-top: -${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S10')};
  text-transform: capitalize;
`;

export default {
  ListItemValue,
  LightWeightLabel,
  ListItemValueHeader,
  KeyValueListHeader,
  KeyValueListSubHeader
};
