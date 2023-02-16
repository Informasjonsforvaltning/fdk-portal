import styled, { css } from 'styled-components';
import ButtonBase from '@fellesdatakatalog/button';
import ChevronDoubleDownIconBase from '@fellesdatakatalog/icons/assets/svg/chevron-double-down-stroke.svg';
import ChevronDoubleUpIconBase from '@fellesdatakatalog/icons/assets/svg/chevron-double-up-stroke.svg';
import { Entity } from '../../types/enums';

type textContentProps = {
  lineHeight: number;
  truncate: boolean;
  visibleLines: number;
  entity?: Entity;
  customColor?: string;
};

const TruncateContainer = styled.div`
  margin-bottom: 1em;
`;

const TextContainer = styled.div<textContentProps>`
  max-height: ${({ lineHeight, visibleLines, truncate }) =>
    truncate ? `${lineHeight * visibleLines}px` : 'inherit'};
  overflow: hidden;
  & a {
    word-break: break-word;
  }
`;

const TextContent = styled.div<textContentProps>`
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  ${({ truncate, lineHeight, visibleLines, entity, customColor }) =>
    truncate &&
    css`
      &:before {
        content: '';
        width: 100%;
        height: ${visibleLines * lineHeight}px;
        position: absolute;
        left: 0;
        top: 0;
        background: linear-gradient(
          transparent ${lineHeight * 3}px,
          ${({ theme }) =>
            entity
              ? theme.extendedColors[entity].lighter
              : customColor || '#FFF'}
        );
      }
    `}

  & img {
    display: none;
  }
`;

type expandButtonProps = {
  entity?: Entity;
};

const ExpandButton = styled(ButtonBase)<expandButtonProps>`
  color: ${({ theme }) => theme?.entityColours?.neutralDarker ?? theme.dark};
  background-color: ${({ theme, entity }) =>
    entity ? theme.extendedColors[entity].lighter : '#FFF'};
`;

const ChevronDoubleDownIcon = styled(ChevronDoubleDownIconBase)`
  width: 16px;
  height: 16px;
  margin-right: 0.25em;
`;

const ChevronDoubleUpIcon = styled(ChevronDoubleUpIconBase)`
  width: 16px;
  height: 16px;
  margin-right: 0.25em;
`;

export default {
  TruncateContainer,
  TextContainer,
  TextContent,
  ExpandButton,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon
};
