import styled, { css } from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';
import ExpansionPanelBase, { SC } from '@fellesdatakatalog/expansion-panel';

interface ExpansionPanelProps {
  showWithoutHeadAndPadding?: boolean;
}

const Section = styled.section`
  margin-top: ${theme.spacing('S32')};

  & > h3 {
    margin-bottom: ${theme.spacing('S12')};
    font-size: ${theme.fontSize('FS20', Unit.REM)};
    font-weight: ${theme.fontWeight('FW400')};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ExpansionPanel = styled(ExpansionPanelBase)<ExpansionPanelProps>`
  padding: ${theme.spacing('S16')};
  border-radius: 5px;
  background: ${theme.colour(Colour.VIOLET, 'V20')};

  &:nth-of-type(n + 2) {
    margin-top: ${theme.spacing('S8')};
  }

  ${({ showWithoutHeadAndPadding }) =>
    showWithoutHeadAndPadding &&
    css`
      padding: 0;
      background: transparent;
    `}

  ${SC.ExpansionPanel.HeadContent} {
    font-size: ${theme.fontSize('FS20', Unit.REM)};
    font-weight: ${theme.fontWeight('FW700')};
    color: ${theme.colour(Colour.VIOLET, 'V50')};

    ${({ showWithoutHeadAndPadding }) =>
      showWithoutHeadAndPadding &&
      css`
        display: none;
      `}
  }

  ${SC.ExpansionPanel.HeadExpansionIndicator} {
    & > button > svg > * {
      stroke: ${theme.colour(Colour.VIOLET, 'V50')};
    }
  }

  ${SC.ExpansionPanel.Body} {
    padding: ${theme.spacing('S16')};
  }
`;

const Link = styled(LinkBase)`
  color: ${theme.colour(Colour.VIOLET, 'V50')} !important;
`;

export default {
  Section,
  ExpansionPanel,
  Link
};
