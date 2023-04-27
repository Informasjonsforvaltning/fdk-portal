import styled from 'styled-components';
import { Colour, Unit, theme as fdkTheme } from '@fellesdatakatalog/theme';

import Link from '@fellesdatakatalog/link';
import RoundedTagSC from '../../../rounded-tag/styled';
import type { InvertedColorProps } from '../../../../types';

const SearchHit = styled.article`
  background-color: #fff;
  border-radius: 5px;
  padding: 1em;
  margin-bottom: 1em;
  position: relative;
  overflow: hidden;
`;

const PublisherLink = styled(Link)``;

const Description = styled.div`
  & a {
    color: ${({ theme: t }) => t.dark};
    text-decoration: underline;
  }
`;

const OpenData = styled.div`
  display: flex;
  margin-bottom: 1em;
  svg {
    width: 20px;
    margin-right: 0.5em;
    path {
      fill: #fff !important;
    }
  }

  ${RoundedTagSC.RoundedTagWithLink} {
    text-decoration: none;
    background-color: ${({ theme: t }) => t.dark};
    color: #fff !important;
  }
`;

const AccessRight = styled.div`
  display: flex;
  margin-bottom: 1em;
  svg {
    width: 20px;
    margin-right: 0.5em;
    path {
      fill: ${({ theme: t }) => t.dark} !important;
    }
  }

  ${RoundedTagSC.RoundedTagWithLink} {
    text-decoration: none;
    background-color: ${({ theme: t }) => t.light};
    color: ${({ theme: t }) => t.dark};
  }
`;

const Theme = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;

  ${RoundedTagSC.RoundedTagWithLink} {
    text-decoration: none;
    background-color: ${({ theme: t }) => t.lighter};
    color: ${({ theme: t }) => t.dark} !important;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0 0.6em;
  }
`;

const Event = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;

  ${RoundedTagSC.RoundedTagWithLink}, ${RoundedTagSC.RoundedTag} {
    text-decoration: none;
    background-color: ${({ theme: t }) => t.dark};
    color: ${fdkTheme.colour(Colour.NEUTRAL, 'N0')} !important;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0 0.6em;
  }
`;

const Format = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;

  & > a {
    text-decoration: none;
    color: ${({ theme: t }) => t.dark} !important;

    border: 1px solid;
    border-color: ${({ theme: t }) => t.dark};
    border-radius: 5px;
    font-size: ${fdkTheme.fontSize('FS12', Unit.REM)};
    padding: 0.3em 0.8em;
    margin-bottom: 0.5em;
    margin-right: 0.5em;
  }
`;

const Data = styled.div`
  margin-bottom: 1em;
`;

const BetaRibbon = styled.span<InvertedColorProps>`
  position: absolute;
  top: 20px;
  right: -35px;
  transform: rotate(45deg);
  padding: ${fdkTheme.spacing('S4')} ${fdkTheme.spacing('S40')};
  font-size: ${fdkTheme.fontSize('FS12', Unit.REM)};
  font-weight: ${fdkTheme.fontWeight('FW700')};
  color: ${({ inverted }) =>
    inverted
      ? fdkTheme.colour(Colour.RED, 'R60')
      : fdkTheme.colour(Colour.RED, 'R30')};
  background: ${({ inverted }) =>
    inverted
      ? fdkTheme.colour(Colour.RED, 'R30')
      : fdkTheme.colour(Colour.RED, 'R60')};
`;

const SearchHitMetaData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

export default {
  SearchHit,
  PublisherLink,
  Description,
  OpenData,
  AccessRight,
  Theme,
  Event,
  Format,
  Data,
  BetaRibbon,
  SearchHitMetaData
};
