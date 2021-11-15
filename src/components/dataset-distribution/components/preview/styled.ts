import styled from 'styled-components';

import ClearIconBase from '../../../../images/icon-clear.svg';

const Modal = styled.div<{ show?: boolean }>`
  z-index: 9999999;
  display: ${({ show }) => (show ? 'block' : 'none')};
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
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2rem;
`;

const ClearIcon = styled(ClearIconBase)`
  width: 15px;
  height: 15px;

  & > path {
    fill: ${({ theme: t }) => t.extendedColors.neutralLightest};
  }
`;

const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.extendedColors.buttonPrimary2};
  color: ${({ theme }) => theme.extendedColors.neutralLightest};
  border: none;
  border-radius: 5px;
  padding: 0.5em;
  min-width: 100px;
  cursor: pointer;
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

export default {
  Modal,
  Container,
  Header,
  ClearIcon,
  CloseButton,
  Center
};
