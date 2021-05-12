import styled from 'styled-components';

const ListItem = styled.li`
  display: flex;
  padding: 10px 0;
  word-break: break-word;

  &:nth-of-type(n + 2) {
    border-top: 1px solid #dfe1e2;
  }
`;

const Property = styled.div`
  flex-basis: 40%;
  font-weight: bold;
  color: ${({ theme }) => theme.extendedColors.textDefault};
`;

const Value = styled.div`
  width: 60%;
`;

export default { ListItem, Property, Value };
