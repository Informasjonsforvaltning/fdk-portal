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
  }
`;

const Section = styled.div`
  padding: 10px 0;
  border-top: 1px solid #dfe1e2;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.neutralDarkest};
  color: white !important;
  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.25);

  &:hover {
    background: black;
  }

  & > svg {
    height: 16px;
    width: 16px;
    min-height: 16px;
    min-width: 16px;
    margin-right: 8px;

    & path {
      fill: white;
    }
  }
`;

export default { DatasetDistribution, Section, DownloadButton };
