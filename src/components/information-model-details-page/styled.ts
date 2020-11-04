import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';
import TabsBase from '@fellesdatakatalog/tabs';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Link = styled(LinkBase)`
  line-height: 1;
`;

const Tabs = styled(TabsBase)`
  padding: ${theme.spacing('S16')};
  border-radius: 5px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const Tab = styled.span`
  display: flex;
  padding: ${theme.spacing('S4')} ${theme.spacing('S8')};
`;

const Pane = styled.div`
  margin-top: ${theme.spacing('S12')};
`;

const Code = styled.pre`
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export default { Link, Tabs, Tab, Pane, Code };
