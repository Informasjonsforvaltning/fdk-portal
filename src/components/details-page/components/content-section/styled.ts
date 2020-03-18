import styled from 'styled-components';

const ContentSection = styled.section`
  &:nth-of-type(n + 2) {
    margin-top: 50px;
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
  padding: 10px 0;
  font-size: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.entityColours.light};
`;

export default { ContentSection, Title };
