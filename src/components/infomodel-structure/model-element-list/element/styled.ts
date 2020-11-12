import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

import ExpansionPanel, { SC } from '../../../expansion-panel';

const ObjectTypeElementExpansionPanel = styled(ExpansionPanel)`
  background-color: transparent;
  border-radius: none;
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) => theme.extendedColors.neutralLighter};
  margin-bottom: 0.5em;

  ${SC.ExpansionPanel.Head} {
    padding: 0.5em 0;
  }

  ${SC.ExpansionPanel.HeadContent} {
    color: ${({ theme }) => theme.extendedColors.neutralDarker} !important;
    font-size: 1.6rem !important;
    font-weight: 400 !important;
    display: flex !important;
    flex: 0 0 80% !important;
    align-items: center;

    & > strong:first-of-type {
      flex-basis: 60%;
    }

    & > span:first-of-type {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      & > a:nth-of-type(n + 2) {
        margin-top: ${theme.spacing('S8')};
      }
    }
  }
`;

export default { ObjectTypeElementExpansionPanel };
