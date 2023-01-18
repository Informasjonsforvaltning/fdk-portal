import styled from 'styled-components';

import { theme, Colour, Unit } from '@fellesdatakatalog/theme';

import ClearIconBase from '../../../../images/icon-clear.svg';

const onMobileView = '@media (max-width: 900px)';

const Modal = styled.div<{ show?: boolean }>`
  z-index: 9999999;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  border-radius: 0px;
  padding: 2rem;

  & > div:last-child {
    flex-grow: 1;
  }

  ${onMobileView} {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing('S4')};
  ${onMobileView} {
    flex-direction: column;
  }
`;

const TitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const Title = styled.h2`
  flex-grow: 1;
  margin-bottom: ${theme.spacing('S4')};
  font-size: ${theme.fontSize('FS20', Unit.REM)};
  ${onMobileView} {
    font-size: ${theme.fontSize('FS14', Unit.REM)};
  }
`;

const Subtitle = styled.h3`
  font-size: ${theme.fontSize('FS16', Unit.REM)};
  margin-bottom: ${theme.spacing('S4')};
  ${onMobileView} {
    font-size: ${theme.fontSize('FS12', Unit.REM)};
  }
`;

const ClearIcon = styled(ClearIconBase)`
  width: 20px;
  height: 20px;
  margin-right: ${theme.spacing('S4')};

  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

const ButtonContainer = styled.div`
  ${onMobileView} {
    order: -1;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${theme.colour(Colour.BLUE, 'B20')};
  color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  border: none;
  padding: ${theme.spacing('S10')};
  cursor: pointer;
  white-space: nowrap;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  & > span {
    max-width: 70%;
  }
`;

const Plain = styled.pre`
  height: 100%;
  overflow: scroll;
`;

export default {
  Modal,
  Container,
  ButtonContainer,
  Header,
  Title,
  TitleHeader,
  Subtitle,
  ClearIcon,
  CloseButton,
  Center,
  Plain
};
