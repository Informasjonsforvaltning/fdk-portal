import styled from 'styled-components';

const Pill = styled.div`
  align-items: center;
  animation: fadein 500ms;
  background-color: ${({ theme }) => theme.extendedColors.neutralDarker};
  border-radius 2.5px;
  color: ${({ theme }) => theme.extendedColors.neutralLightest};
  display: flex;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.25em 0 0.25em 0.4em;
`;

const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClearButton = styled.button`
  border: none;
  display: flex;
  margin: 0 0.5rem;

  & > i {
    background-color: ${({ theme }) => theme.extendedColors.neutralDarker};
    color: ${({ theme }) => theme.extendedColors.neutralLightest};
  }
`;

export default { Pill, Label, ClearButton };
