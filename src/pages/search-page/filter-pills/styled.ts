import { Unit, theme as themeFDK } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Heading = styled.h3`
  font-size: ${themeFDK.fontSize('FS20', Unit.REM)};
  font-weight: 600;
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5em;
`;

const ClearButton = styled.button`
  animation: fadein 500ms;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.extendedColors.neutralDarker};
  border-radius: 2px;
  padding: 0.25em 0.4em;
  font-size: ${themeFDK.fontSize('FS14', Unit.REM)};
  line-height: 1.6em;
  margin: 0.5em 0 1.5em 0;
`;

export default { Heading, Pills, ClearButton };
