import styled from 'styled-components';

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ClearButton = styled.button`
  animation: fadein 500ms;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.extendedColors.neutralDarker};
  border-radius: 2px;
  padding: 0em 0.4em 0em 0.4em;
  white-space: nowrap;
  height: 32px;
`;

export default { Pills, ClearButton };
