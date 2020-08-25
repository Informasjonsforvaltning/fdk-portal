import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ConceptLink = styled(Link)`
  color: ${({ theme }) => theme.dark} !important;
  margin: 1em;
`;

export default {
  ConceptLink
};
