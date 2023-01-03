import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background: transparent;

  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export default {
  Button
};
