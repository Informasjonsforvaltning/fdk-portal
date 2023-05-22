import styled from 'styled-components';
import StyledComponents from '../styled';

const InfoIcon = styled.span`
  display: flex;
  flex-direction: row;
  align-items: end;
  color: #fff;
  background-color: transparent;
  border: none;
  width: 50px;

  &:nth-of-type(n + 2) {
    margin-left: 1.5em;
  }

  &:hover > svg > path {
    fill: #fff;
  }
`;

export default { InfoIcon, ...StyledComponents };
