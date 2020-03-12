import styled from 'styled-components';

import ExpansionPanel, { SC } from '../../../expansion-panel';

const DatasetDistribution = styled(ExpansionPanel)`
  background: white;
  border-radius: 5px;
  overflow: hidden;

  &:nth-of-type(n + 2) {
    margin-top: 10px;
  }

  & > ${SC.ExpansionPanel.Head} {
    padding: 12px 24px;

    & > ${SC.ExpansionPanel.HeadContent} {
      flex: 1;
      min-width: 0;
    }

    & > ${SC.ExpansionPanel.HeadExpansionIndicator} {
      margin-left: 24px;
    }
  }

  & > ${SC.ExpansionPanel.Body} {
    padding: 0px 24px 12px;

    & > a {
      display: flex;
      padding: 10px 0;
      border-top: 1px solid #dfe1e2;
    }
  }
`;

export default { DatasetDistribution };
