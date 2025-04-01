import styled from 'styled-components';
import { Unit, theme as themeFDK } from '@fellesdatakatalog/theme';
import AuthoritativeIconBase from '../../../../images/icon-authoritative-md.svg';
import type { InvertedColorProps } from '../../../../types';

const Head = styled.div<InvertedColorProps>`
  border-radius: 5px;
  display: flex;
  padding: 0.5em;

  a {
    color: ${({ theme }) => theme.extendedColors.neutralDarker} !important;
  }
`;

const HeadTypeIndicator = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: ${themeFDK.spacing('S10')};
`;

const Title = styled.h2`
  font-size: ${themeFDK.fontSize('FS24', Unit.REM)};
  font-weight: 600;
  border-bottom: solid 2px ${({ theme }) => theme.extendedColors.neutralDarker};
  :hover {
    border-color: transparent;
  }
`;

const Type = styled.span`
  font-size: ${themeFDK.fontSize('FS16', Unit.REM)};
  font-weight: bold;
`;

const AuthoritativeIcon = styled(AuthoritativeIconBase)`
  margin-left: 0.5em;
  padding-bottom: 0.3em;
  width: 1.2em;
`;

export default {
  Head,
  HeadTypeIndicator,
  Header,
  Title,
  Type,
  AuthoritativeIcon
};
