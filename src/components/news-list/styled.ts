import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';
import { Unit, theme as themeFDK } from '@fellesdatakatalog/theme';

const NewsList = styled.div`
  display: flex;
  flex-flow: column;
  color: ${({ theme }) => theme.extendedColors.neutralDarker} !important;
`;

const Link = styled(LinkBase)`
  font-size: ${themeFDK.fontSize('FS16', Unit.REM)};
  font-weight: ${themeFDK.fontWeight('FW700')};
  margin-top: ${themeFDK.spacing('S8')};
`;

export default {
  NewsList,
  Link
};
