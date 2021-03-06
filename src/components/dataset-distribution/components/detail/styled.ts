import styled from 'styled-components';

const Detail = styled.div`
  display: flex;
  padding: 10px 0;
  border-top: 1px solid #dfe1e2;
  word-break: break-word;
`;

const Property = styled.div`
  flex-basis: 30%;
  font-weight: bold;
  color: ${({ theme }) => theme.extendedColors.textDefault};
`;

const Value = styled.div`
  flex-basis: 70%;
`;

export default { Detail, Property, Value };
