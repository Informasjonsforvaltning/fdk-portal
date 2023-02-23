import styled from 'styled-components';

const CollapseButton = styled.button`
  border: none;
  background: transparent;

  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }
`;

export default { CollapseButton };
