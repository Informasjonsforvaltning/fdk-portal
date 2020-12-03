import styled, { css } from 'styled-components';
import ExpansionPanel, { SC } from '../expansion-panel';

const InfoModelStructure = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1em;

  a {
    cursor: pointer;
  }
`;

const Section = styled.div``;

const SectionHeader = styled.h3`
  color: ${({ theme }) => theme.extendedColors.neutralDark};
  font-size: 2rem;
  font-weight: 300;
  margin: 1em 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ObjectTypeExpansionPanel = styled(ExpansionPanel)<{
  showWithoutHeadAndPadding?: boolean;
}>`
  background-color: ${({ theme }) => theme.extendedColors.neutralLightest};
  border-radius: 5px;
  margin-bottom: 0.5em;
  padding: 1em;

  ${({ showWithoutHeadAndPadding }) =>
    showWithoutHeadAndPadding &&
    css`
      background-color: transparent;
      padding: 0;
    `}

  ${SC.ExpansionPanel.HeadContent} {
    ${({ showWithoutHeadAndPadding }) =>
      showWithoutHeadAndPadding &&
      css`
        display: none;
      `}

    color: ${({ theme }) => theme.extendedColors.link};
    font-size: 2rem;
    font-weight: 600;
  }

  ${SC.ExpansionPanel.Body} {
    padding: 1em;
  }
`;

export default {
  InfoModelStructure,
  Section,
  SectionHeader,
  ObjectTypeExpansionPanel
};
