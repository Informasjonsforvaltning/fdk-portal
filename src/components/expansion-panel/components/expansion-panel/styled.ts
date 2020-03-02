import styled, { css } from 'styled-components';

import CollapseIconBase from '../../../../images/icon-collapse-md.svg';
import ExpandIconBase from '../../../../images/icon-expand-md.svg';

const ExpansionPanel = styled.div`
  border-radius: 5px;
`;

const HeadContent = styled.div``;

const HeadExpansionIndicator = styled.div`
  display: flex;
  align-items: center;
`;

const Head = styled.div<{ shouldExpandOnHeadClick?: boolean }>`
  display: flex;
  justify-content: space-between;
  user-select: none;

  ${({ shouldExpandOnHeadClick }) =>
    shouldExpandOnHeadClick
      ? css`
          cursor: pointer;
        `
      : css`
          & > ${HeadExpansionIndicator} {
            cursor: pointer;
          }
        `}
`;

const CollapseIcon = styled(CollapseIconBase)`
  height: 16px;
  width: 16px;
`;

const ExpandIcon = styled(ExpandIconBase)`
  height: 16px;
  width: 16px;
`;

const Body = styled.div``;

export default {
  ExpansionPanel,
  HeadContent,
  HeadExpansionIndicator,
  Head,
  CollapseIcon,
  ExpandIcon,
  Body
};
