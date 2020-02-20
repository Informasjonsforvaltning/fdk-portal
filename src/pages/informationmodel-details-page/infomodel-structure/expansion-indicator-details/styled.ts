import styled from 'styled-components';
import CollapseIconBase from '../../../../images/icon-collapse-md.svg';
import ExpandIconBase from '../../../../images/icon-expand-md.svg';

const CollapseIcon = styled(CollapseIconBase)`
  height: 16px;
  width: 16px;
  margin-right: 0.5em;
`;

const ExpandIcon = styled(ExpandIconBase)`
  height: 16px;
  width: 16px;
  margin-right: 0.5em;
`;

const IndicatorText = styled.span`
  color: ${({ theme }) => theme.fdk.colors.link};
`;

export default { CollapseIcon, ExpandIcon, IndicatorText };
