import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';
import TabsBase from '@fellesdatakatalog/tabs';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Link = styled(LinkBase)`
  color: ${theme.colour(Colour.VIOLET, 'V50')} !important;
`;

const Tabs = styled(TabsBase)`
  padding: ${theme.spacing('S16')};
  border-radius: 5px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const Tab = styled.span`
  padding: ${theme.spacing('S6')} ${theme.spacing('S12')};

  &.active,
  &:before,
  &:after {
    border-color: ${theme.colour(Colour.VIOLET, 'V30')};
  }

  &:not(.active) {
    color: ${theme.colour(Colour.VIOLET, 'V50')};
  }
`;

const Pane = styled.div`
  margin-top: ${theme.spacing('S12')};
`;

const Code = styled.pre`
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const Format = styled.div`
  align-items: baseline;
  display: inline-flex;
  margin-bottom: 0.5em;
`;

const FormatTag = styled.span`
  margin-left: 0.5em;
  white-space: pre;
`;

export default { Link, Tabs, Tab, Pane, Code, Format, FormatTag };
