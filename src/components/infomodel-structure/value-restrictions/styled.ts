import styled from 'styled-components';

const Restriction = styled.div`
  display: flex;
  padding: 0.5em 0;
  border-bottom: 1px solid ${({ theme }) => theme.extendedColors.neutralLighter};

  &:nth-last-of-type(n + 2) {
    margin-bottom: 0.5em;
  }

  & > span {
    display: flex;

    &:first-of-type {
      flex-basis: 40%;
    }
  }
`;

export default { Restriction };
