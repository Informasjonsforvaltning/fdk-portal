import styled from 'styled-components';

const ListTitle = styled.div`
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) => theme.fdk.colors.neutralLighter};
  color: ${({ theme }) => theme.fdk.colors.neutralDark};
  margin-top: 1.5em;
  padding-bottom: 0.5em;
`;

export default {
  ListTitle
};
