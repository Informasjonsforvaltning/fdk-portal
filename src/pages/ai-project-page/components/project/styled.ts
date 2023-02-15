import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';

import ExpansionPanel, { SC } from '@fellesdatakatalog/expansion-panel';

const AiProject = styled(ExpansionPanel)`
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
  border-radius: 5px;
  overflow: hidden;
  width: 100%;

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
        stroke: ${({ theme: t }) => t.extendedColors.dataset.dark};
      }
    }
  }

  & > ${SC.ExpansionPanel.Body} {
    padding: 0px 24px 12px;
  }
`;

const Section = styled.div`
  padding: 10px 0;
  border-top: 1px solid ${theme.colour(Colour.NEUTRAL, 'N20')};
`;

const Link = styled(LinkBase)`
  align-items: flex-start;
`;

const ColumnData = styled.ul``;

const ColumnRow = styled.li``;

const Summary = styled.div`
  & > h2 {
    font-size: ${theme.fontSize('FS24')};
  }
`;

export default {
  AiProject,
  Section,
  Link,
  ColumnData,
  ColumnRow,
  Summary
};
