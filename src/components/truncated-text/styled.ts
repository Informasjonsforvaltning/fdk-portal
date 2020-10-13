import styled, { css } from 'styled-components';
import { Entity } from '../../types/enums';

type textContentProps = {
  lineHeight: number;
  truncate: boolean;
  visibleLines: number;
};

const TextContent = styled.div<textContentProps>`
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: ${({ lineHeight }) => lineHeight || 20}px;

  ${({ truncate, lineHeight, visibleLines }) =>
    truncate &&
    css`
      -webkit-line-clamp: ${visibleLines};

      &:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: linear-gradient(
          transparent ${lineHeight * 3}px,
          ${({ theme }) => theme.extendedColors[Entity.DATASET].lighter}
        );
      }
    `}
`;

type expandButtonProps = {
  open: boolean;
};

const ExpandButton = styled.button<expandButtonProps>`
  border: none;
  border-bottom-style: dotted;
  border-bottom-color: ${({ theme }) => theme.entityColours.neutralDarker};
  color: ${({ theme }) => theme.entityColours.neutralDarker};
  background-color: ${({ theme }) =>
    theme.extendedColors[Entity.DATASET].lighter};

  &:before {
    font-family: FontAwesome;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 0.25em;
  }

  ${props =>
    props.open
      ? css`
          &:before {
            content: '\\f102';
          }
        `
      : css`
          &:before {
            content: '\\f103';
          }
        `}
`;
export default { TextContent, ExpandButton };
