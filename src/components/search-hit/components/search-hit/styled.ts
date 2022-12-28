import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

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

  a {
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PublisherLink = styled(Link)``;

const Description = styled.p`
  font-size: 2rem;
  margin-bottom: 2.3rem;
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

  ${RoundedTagSC.RoundedTag} {
    background-color: ${({ theme: t }) => t.dark};
    color: #fff !important;
    &:hover {
      color: #fff;
      background-color: #121619;
      cursor: default;
      text-decoration: none;
    }
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

  ${RoundedTagSC.RoundedTag} {
    background-color: ${({ theme: t }) => t.light};
    color: ${({ theme: t }) => t.dark};
    &:hover {
      color: #fff !important;
      cursor: default;
      background-color: #121619 !important;
      text-decoration: none;
      svg {
        path {
          fill: #fff !important;
        }
      }
    }
  }
`;

const Theme = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;

  ${RoundedTagSC.RoundedTagWithLink} {
    background-color: ${({ theme: t }) => t.lighter};
    color: ${({ theme: t }) => t.dark} !important;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0 0.6em;
    &:hover {
      color: #fff !important;
      background-color: #121619 !important;
      text-decoration: none;
    }
  }
`;

const Event = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;

  ${RoundedTagSC.RoundedTagWithLink}, ${RoundedTagSC.RoundedTag} {
    background-color: ${({ theme: t }) => t.dark};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')} !important;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0 0.6em;
    &:hover {
      background-color: ${theme.colour(Colour.NEUTRAL, 'N70')} !important;
      text-decoration: none;
    }
  }
`;

const Format = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
  span {
    border: 1px solid;
    border-color: ${({ theme: t }) => t.dark};
    border-radius: 5px;
    font-size: 1.3rem;
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
