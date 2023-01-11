import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3em;
  font-weight: 600;
`;

const SubTitle = styled.h2`
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 1.5em;
  margin-top: 0.5em;
`;

const ClearButton = styled.button`
  animation: fadein 500ms;
  background-color: ${({ theme }) => theme.extendedColors.neutralLighter};
  border: none;
  font-size: 1.5rem;
  line-height: 1.5rem;
  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.2);
  padding: 0.8em 0.9em;
`;

const ContainerBoxRegular = styled.div`
  flex: 1 1 0;
`;

const ContainerPaneContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
`;

export default {
  Title,
  SubTitle,
  ClearButton
};

export { ContainerBoxRegular, ContainerPaneContent };
