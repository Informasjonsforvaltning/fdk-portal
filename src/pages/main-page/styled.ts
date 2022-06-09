import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';
import { theme } from '@fellesdatakatalog/theme';

const Content = styled.div`
  display: flex;
  margin-top: 2em;
  @media (min-width: 992px) {
    flex-direction: row-reverse;
    margin-top: 4em;
  }
`;

const CommunityPosts = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`;

const Link = styled(LinkBase)`
  font-size: ${theme.fontSize('FS16')};
  font-weight: ${theme.fontWeight('FW700')};
  margin-top: ${theme.spacing('S8')};
`;

export default { Content, CommunityPosts, Link };
