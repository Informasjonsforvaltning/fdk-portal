import styled, { css } from 'styled-components';

import CollapseIconBase from '../../../../images/icon-collapse-md.svg';
import ExpandIconBase from '../../../../images/icon-expand-md.svg';

const ExpansionPanel = styled.div`
  border-radius: 5px;
`;

const HeadContent = styled.div``;

const HeadExpansionIndicator = styled.div``;

const Head = styled.div<{ shouldExpandOnHeadClick?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
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

const Body = styled.div`
  padding: 15px 20px;
`;

export default {
  ExpansionPanel,
  HeadContent,
  HeadExpansionIndicator,
  Head,
  CollapseIcon,
  ExpandIcon,
  Body
};
