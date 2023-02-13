import { Unit, theme as themeFDK } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';

import SquareThreeStrokeIconBase from '@fellesdatakatalog/icons/assets/svg/square-three-stroke.svg';
import PlusStrokeIconBase from '@fellesdatakatalog/icons/assets/svg/plus-stroke.svg';
import LockOpenStrokeIconBase from '@fellesdatakatalog/icons/assets/svg/lock-open-stroke.svg';
import LockSemiOpenStrokeIconBase from '@fellesdatakatalog/icons/assets/svg/lock-semi-open-stroke.svg';
import LockLockedStrokeIconBase from '@fellesdatakatalog/icons/assets/svg/lock-locked-stroke.svg';
import StarStrokeIconBase from '@fellesdatakatalog/icons/assets/svg/star-stroke.svg';
import BookBookmarkStrokeIconBase from '@fellesdatakatalog/icons/assets/svg/book-bookmark-stroke.svg';
import { Entity } from '../../types/enums';

const Title = styled.h1`
  font-size: ${themeFDK.fontSize('FS28', Unit.EM)};
  font-weight: 600;
`;

const SubTitle = styled.h2`
  font-size: ${themeFDK.fontSize('FS20', Unit.EM)};
  font-weight: 600;
  margin-bottom: 1.5em;
  margin-top: 0.5em;
`;

const ClearButton = styled.button`
  animation: fadein 500ms;
  background-color: ${({ theme }) => theme.extendedColors.neutralLighter};
  border: none;
  font-size: ${themeFDK.fontSize('FS14', Unit.REM)};
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

const NapStrokeStyle = css`
  & * {
    stroke: ${({ theme }) => theme.extendedColors[Entity.DATASET].graph.dark};
  }
`;

const NapSquareThreeStrokeIcon = styled(SquareThreeStrokeIconBase)`
  ${NapStrokeStyle}
`;
const NapPlusStrokeIcon = styled(PlusStrokeIconBase)`
  ${NapStrokeStyle}
`;
const NapLockOpenStrokeIcon = styled(LockOpenStrokeIconBase)`
  ${NapStrokeStyle}
`;
const NapLockSemiOpenStrokeIcon = styled(LockSemiOpenStrokeIconBase)`
  ${NapStrokeStyle}
`;
const NapLockLockedStrokeIcon = styled(LockLockedStrokeIconBase)`
  ${NapStrokeStyle}
`;
const NapStarStrokeIcon = styled(StarStrokeIconBase)`
  ${NapStrokeStyle}
`;
const NapBookBookmarkStrokeIcon = styled(BookBookmarkStrokeIconBase)`
  ${NapStrokeStyle}
`;

export default {
  Title,
  SubTitle,
  ClearButton
};

export {
  ContainerBoxRegular,
  ContainerPaneContent,
  NapSquareThreeStrokeIcon,
  NapPlusStrokeIcon,
  NapLockOpenStrokeIcon,
  NapLockSemiOpenStrokeIcon,
  NapLockLockedStrokeIcon,
  NapStarStrokeIcon,
  NapBookBookmarkStrokeIcon
};
