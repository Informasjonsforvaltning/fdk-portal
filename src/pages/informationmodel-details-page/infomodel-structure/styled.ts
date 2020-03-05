import styled, { css } from 'styled-components';
import ExpansionPanel, { SC } from '../../../components/expansion-panel';

const InfoModelStructure = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  padding-top: 1em;

  a {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1em;
`;

const Section = styled.div`
  margin-bottom: 1em;
`;

const SectionHeader = styled.h3`
  color: ${({ theme }) => theme.fdk.colors.neutralDark};
  font-weight: 300;
  margin-bottom: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ObjectTypeExpansionPanel = styled(ExpansionPanel)<{
  showWithoutHeadAndPadding?: boolean;
}>`
  background-color: ${({ theme }) => theme.fdk.colors.neutralLightest};
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
       
    color: ${({ theme }) => theme.fdk.colors.link};
    font-size: 2rem;
    font-weight: 600;
  }
  
  ${SC.ExpansionPanel.Body} {
    padding: 1em;
  }
`;

export default {
  InfoModelStructure,
  Title,
  Section,
  SectionHeader,
  ObjectTypeExpansionPanel
};
