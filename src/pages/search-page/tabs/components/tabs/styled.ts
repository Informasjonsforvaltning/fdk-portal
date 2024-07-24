import styled from 'styled-components';

const Tabs = styled.ul`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-bottom: 0;
  @media (max-width: 768px) {
    justify-content: space-around;
    flex-direction: column;
    align-items: stretch;
  }
`;

const Label = styled.span`
  white-space: nowrap;
`;

export default {
  Tabs,
  Label
};
