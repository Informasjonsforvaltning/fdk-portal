import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import type { InvertedColorProps } from '../../../../types';

const onMobileView = '@media (max-width: 768px)';

const Banner = styled.header<InvertedColorProps>`
  display: flex;
  width: 100%;
  padding: 18px;
  border-radius: 5px;
  color: ${({ theme, inverted }) =>
    inverted ? theme.entityColours.light : theme.entityColours.dark};
  background: ${({ theme, inverted }) =>
    inverted ? theme.entityColours.dark : theme.entityColours.light};
  position: relative;
  overflow: hidden;

  & svg > path {
    fill: ${({ theme, inverted }) =>
      inverted ? theme.entityColours.light : theme.entityColours.dark};
  }

  & > svg {
    height: 42px;
    width: 42px;
    min-height: 42px;
    min-width: 42px;

    ${onMobileView} {
      height: 20px;
      width: 20px;
      min-height: 20px;
      min-width: 20px;
    }
  }
`;

const Content = styled.div`
  margin-left: 12px;
`;

const Title = styled.h1`
  display: flex inline;
  margin: 0;
  line-height: 42px;
  font-size: 42px;
  font-weight: bold;

  svg {
    height: 24px;
    width: 24px;
    min-height: 24px;
    min-width: 24px;
    margin-left: 12px;
    margin-top: -3px;
  }

  div {
    display: inline;
  }

  ${onMobileView} {
    line-height: 24px;
    font-size: 24px;
    white-space: normal;
    word-wrap: break-word;
  }
`;

const LastPublishedInfo = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 20px;

  ${onMobileView} {
    font-size: 16px;
  }
`;

const BetaRibbon = styled.span<InvertedColorProps>`
  position: absolute;
  top: 25px;
  right: -40px;
  transform: rotate(45deg);
  padding: ${theme.spacing('S4')} ${theme.spacing('S40')};
  font-size: 1rem;
  font-weight: ${theme.fontWeight('FW700')};
  color: ${({ inverted }) =>
    inverted
      ? theme.colour(Colour.RED, 'R60')
      : theme.colour(Colour.RED, 'R30')};
  background: ${({ inverted }) =>
    inverted
      ? theme.colour(Colour.RED, 'R30')
      : theme.colour(Colour.RED, 'R60')};
`;

export default { Banner, Content, Title, LastPublishedInfo, BetaRibbon };
