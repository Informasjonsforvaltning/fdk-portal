import styled, { css } from 'styled-components';
import { Entity } from '../../types/enums';

type textContentProps = {
  lineHeight: number;
  truncate: boolean;
  visibleLines: number;
  entity?: Entity;
};

const TruncateContainer = styled.div`
  margin-bottom: 1em;
`;

const TextContent = styled.div<textContentProps>`
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: ${({ lineHeight }) => lineHeight || 20}px;

  ${({ truncate, lineHeight, visibleLines, entity }) =>
    truncate &&
    css`
      -webkit-line-clamp: ${visibleLines};
      height: ${visibleLines * lineHeight}px;

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
            entity ? theme.extendedColors[entity].lighter : '#FFF'}
        );
      }
    `}
`;

type expandButtonProps = {
  open: boolean;
  entity?: Entity;
};

const ExpandButton = styled.button<expandButtonProps>`
  border: none;
  border-bottom-style: dotted;
  border-bottom-color: ${({ theme }) =>
    theme?.entityColours?.neutralDarker ?? theme.dark};
  color: ${({ theme }) => theme?.entityColours?.neutralDarker ?? theme.dark};
  background-color: ${({ theme, entity }) =>
    entity ? theme.extendedColors[entity].lighter : '#FFF'};

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
export default { TruncateContainer, TextContent, ExpandButton };
