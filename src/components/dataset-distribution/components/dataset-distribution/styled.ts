import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

import ExpansionPanel, { SC } from '@fellesdatakatalog/expansion-panel';

const DatasetDistribution = styled(ExpansionPanel)`
  background: white;
  border-radius: 5px;
  overflow: hidden;

  &:nth-of-type(n + 2) {
    margin-top: 10px;
  }

  & > ${SC.ExpansionPanel.Head} {
    padding: 1em 2em;

    & > ${SC.ExpansionPanel.HeadContent} {
      flex: 1;
      min-width: 0;
    }

    & > ${SC.ExpansionPanel.HeadExpansionIndicator} {
      margin-left: 24px;

      & > svg > path {
        fill: ${({ theme: t }) => t.extendedColors.dataset.dark};
      }
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

const DownloadLink = styled(Link)`
  & > i > svg > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

export default { DatasetDistribution, Section, DownloadLink };
