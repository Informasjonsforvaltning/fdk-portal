import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const ListItemValue = styled.div`
  margin-bottom: ${theme.spacing('S10')};
`;

const LightWeightLabel = styled.span`
  font-weight: ${theme.fontWeight('FW400')};
`;

export default {
  ListItemValue,
  LightWeightLabel
};
