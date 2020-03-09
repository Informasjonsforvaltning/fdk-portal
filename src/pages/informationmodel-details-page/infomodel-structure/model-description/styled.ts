import styled from 'styled-components';

const ModelDescription = styled.div`
    color: ${({ theme }) => theme.colors.neutralDarker};
    font-size: 1.6rem;
    font-weight: 400;
    display: flex;
    flex-direction: column;
  }
`;

const DescriptionField = styled.div`
  display: flex;
  margin-bottom: 0.3em;
  & > :first-child {
    flex: 0 0 25%;
  }
`;

export default { ModelDescription, DescriptionField };
