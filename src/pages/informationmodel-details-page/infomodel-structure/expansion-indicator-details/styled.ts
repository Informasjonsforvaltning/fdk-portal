import styled from 'styled-components';
import CollapseIconBase from '../../../../images/icon-collapse-text-sm.svg';
import ExpandIconBase from '../../../../images/icon-expand-text-sm.svg';

const CollapseIcon = styled(CollapseIconBase)`
  height: 16px;
  width: 16px;
  margin-right: 0.5em;
  fill: ${({ theme }) => theme.fdk.colors.link};
`;

const ExpandIcon = styled(ExpandIconBase)`
  height: 16px;
  width: 16px;
  margin-right: 0.5em;
  fill: ${({ theme }) => theme.fdk.colors.link};
`;

const IndicatorText = styled.span`
  color: ${({ theme }) => theme.fdk.colors.link};
`;

export default { CollapseIcon, ExpandIcon, IndicatorText };
