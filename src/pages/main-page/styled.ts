import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';
import { Unit, theme } from '@fellesdatakatalog/theme';

const Sidebar = styled.section`
  margin-top: 7.5rem;
`;

const Content = styled.div`
  display: flex;
  margin-top: 2em;
  @media (min-width: 992px) {
    margin-top: 4em;
  }
`;

const CommunityPosts = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled(LinkBase)`
  padding-left: ${theme.spacing('S10')};
  font-size: ${theme.fontSize('FS16', Unit.REM)};
  font-weight: ${theme.fontWeight('FW700')};
  margin-top: ${theme.spacing('S8')};
`;

export default { Sidebar, Content, CommunityPosts, Link };
