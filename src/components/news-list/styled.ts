import styled from 'styled-components';
import { Link as LinkBase } from 'react-router-dom';

const NewsList = styled.div`
  display: flex;
  flex-flow: column;
`;

const Link = styled(LinkBase)`
  color: ${({ theme }) => theme.extendedColors.neutralDarker} !important;
  text-decoration: underline;
`;

export default {
  NewsList,
  Link
};
