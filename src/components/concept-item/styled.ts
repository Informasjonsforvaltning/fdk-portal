import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';
import CircleMinusIconBase from '@fellesdatakatalog/icons/assets/svg/circle-minus-stroke.svg';
import CirclePlusIconBase from '@fellesdatakatalog/icons/assets/svg/circle-plus-stroke.svg';

const ButtonCompare = styled.button`
  background-color: transparent;
  border-radius: 5px;
  border: 1px dashed;
  color: ${({ theme: themeFDK }) => themeFDK.dark};
`;

const CircleMinusIcon = styled(CircleMinusIconBase)`
  width: 16px;
  height: 16px;
  margin-right: ${theme.spacing('S4')};
  & * {
    stroke: ${({ theme: themeFDK }) => themeFDK.dark};
  }
`;

const CirclePlusIcon = styled(CirclePlusIconBase)`
  width: 16px;
  height: 16px;
  margin-right: ${theme.spacing('S4')};
  & * {
    stroke: ${({ theme: themeFDK }) => themeFDK.dark};
  }
`;

export default {
  ButtonCompare,
  CircleMinusIcon,
  CirclePlusIcon
};
