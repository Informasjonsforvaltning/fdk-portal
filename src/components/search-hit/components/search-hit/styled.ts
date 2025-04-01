import styled from 'styled-components';
import { Colour, Unit, theme as fdkTheme } from '@fellesdatakatalog/theme';

import RoundedTagSC from '../../../rounded-tag/styled';

const SearchHit = styled.article`
  background-color: #fff;
  border-radius: 5px;
  padding: 1em;
  margin-bottom: 1em;
  position: relative;
  overflow: hidden;
`;

const Description = styled.div`
  padding: 0.5em;
  & a {
    color: ${({ theme: t }) => t.dark};
    text-decoration: underline;
  }
`;

const OpenData = styled.li`
  display: flex;
  white-space: nowrap;
  margin-bottom: 0.04em;
  svg {
    width: 20px;
    margin-right: 0.5em;
    path {
      color: black !important;
    }
  }

  ${RoundedTagSC.RoundedTagWithLink} {
    text-decoration: none;
    background-color: var(--fds-semantic-surface-success-subtle);
    color: black !important;
  }
`;

const AccessRight = styled.li`
  display: flex;
  white-space: nowrap;
  margin-bottom: 1em;
  svg {
    width: 20px;
    margin-right: 0.5em;
    path {
      color: black !important;
    }
  }

  ${RoundedTagSC.RoundedTagWithLink} {
    text-decoration: none;
    background-color: var(--fds-semantic-surface-warning-default);
    color: black !important;
  }
`;

const Theme = styled.li`
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;

  ${RoundedTagSC.RoundedTagWithLink} {
    text-decoration: none;
    background-color: ${({ theme }) => theme.extendedColors.neutralLightest};
    color: ${({ theme }) => theme.extendedColors.neutralDarker} !important;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0 0.6em;
    border: solid 1px ${({ theme }) => theme.extendedColors.neutralLighter};
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

const Format = styled.li`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;

  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.extendedColors.neutralDarker} !important;

    border: 1px solid;
    border-color: ${({ theme }) => theme.extendedColors.neutralDarker};
    border-radius: 5px;
    font-size: ${fdkTheme.fontSize('FS12', Unit.REM)};
    padding: 0.3em 0.8em;
    margin-bottom: 0.5em;
    margin-right: 0.5em;
  }
`;

const Data = styled.li`
  margin-bottom: 1em;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1rem;
`;

export default {
  SearchHit,
  Description,
  OpenData,
  AccessRight,
  Theme,
  Event,
  Format,
  Data,
  Tags
};
