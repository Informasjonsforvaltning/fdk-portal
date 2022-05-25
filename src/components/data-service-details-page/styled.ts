import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';
import { theme as fdkTheme } from '@fellesdatakatalog/theme';

const Link = styled(LinkBase)`
  color: ${({ theme }) => theme.entityColours.dark} !important;
`;

const ExternalLinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${fdkTheme.spacing('S10')};
`;

export default { Link, ExternalLinkList };
