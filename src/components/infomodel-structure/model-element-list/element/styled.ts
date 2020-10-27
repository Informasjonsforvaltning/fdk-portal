import styled from 'styled-components';
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
    color: ${({ theme }) => theme.extendedColors.neutralDarker};
    font-size: 1.6rem;
    font-weight: 400;
    display: flex;
    flex: 0 0 80%;

    & > strong:first-of-type {
      flex-basis: 60%;
    }
    & > div:first-of-type {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;

      & > a {
        cursor: pointer;
      }
    }
  }
`;

export default { ObjectTypeElementExpansionPanel };
