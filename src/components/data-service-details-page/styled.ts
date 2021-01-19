import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';

const Link = styled(LinkBase)`
  color: ${({ theme }) => theme.entityColours.dark} !important;
`;

export default { Link };
