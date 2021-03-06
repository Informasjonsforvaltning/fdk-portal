import styled from 'styled-components';

const Header = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1em;
  text-align: center;

  @media (min-width: 992px) {
    text-align: left;
  }
`;

export default {
  Header
};
