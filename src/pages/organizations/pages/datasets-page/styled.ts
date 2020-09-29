import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import MetadataQualityExcellentSVG from '../../../../images/icon-quality-excellent-md.svg';
import MetadataQualityGoodSVG from '../../../../images/icon-quality-good-md.svg';
import MetadataQualitySufficientSVG from '../../../../images/icon-quality-sufficient-md.svg';
import MetadataQualityPoorSVG from '../../../../images/icon-quality-poor-md.svg';

const DatasetsPage = styled.article`
  flex: 1 0 auto;
  overflow: hidden;
`;

const BetaRibbon = styled.span`
  position: absolute;
  top: 8px;
  right: -33px;
  transform: rotate(45deg);
  padding: ${theme.spacing('S6')} ${theme.spacing('S40')};
  font-weight: ${theme.fontWeight('FW700')};
  color: ${theme.colour(Colour.BLUE, 'B50')};
  background: ${theme.colour(Colour.YELLOW, 'Y30')};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const Subtitle = styled.h2`
  font-size: ${theme.fontSize('FS24')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const Section = styled.section`
  margin-top: ${theme.spacing('S40')};
`;

const MetadataCellContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    height: 30px;
    width: 30px;
    min-height: 30px;
    min-width: 30px;
  }

  & > span {
    min-width: 40px;
    margin-left: ${theme.spacing('S8')};
    font-weight: ${theme.fontWeight('FW700')};
  }
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0 5px;
  border-collapse: separate;
  table-layout: fixed;

  tr {
    text-align: left;
    background: ${theme.colour(Colour.NEUTRAL, 'N0')};
    padding: ${theme.spacing('S10')} 0;
  }

  td,
  th {
    padding: ${theme.spacing('S12')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;

    &:first-of-type {
      width: 21%;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:nth-of-type(n + 2) {
      text-align: center;
    }
  }

  th {
    & > div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    background: ${theme.colour(Colour.BLUE, 'B50')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    font-weight: ${theme.fontWeight('FW700')};
  }

  tbody > tr {
    color: ${theme.colour(Colour.BLUE, 'B50')};
    cursor: pointer;

    &:hover {
      background: ${theme.colour(Colour.NEUTRAL, 'N60')};
      color: ${theme.colour(Colour.NEUTRAL, 'N0')};

      & ${MetadataCellContents} > svg > path {
        fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
      }
    }
  }
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: ${theme.spacing('S12')};
  border: none;
  border-bottom: 1px solid transparent;
  appearance: none;
  background: none;
  color: ${theme.colour(Colour.BLUE, 'B50')};

  &:hover {
    border-color: ${theme.colour(Colour.BLUE, 'B50')};
  }

  & > svg {
    height: 20px;
    width: 20px;

    & > g {
      fill: ${theme.colour(Colour.BLUE, 'B50')};
    }
  }

  & > span {
    margin-left: ${theme.spacing('S8')};
  }
`;

const PoorQualityIcon = styled(MetadataQualityPoorSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const SufficientQualityIcon = styled(MetadataQualitySufficientSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }

  & > circle:first-of-type {
    fill: ${theme.colour(Colour.BLUE, 'B30')};
  }
`;

const GoodQualityIcon = styled(MetadataQualityGoodSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50', 85)};
  }
`;

const ExcellentQualityIcon = styled(MetadataQualityExcellentSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const FrequentlyAskedQuestions = styled.div`
  display: flex;
`;

const Question = styled.div`
  flex: 1 0 auto;
  width: calc(100% / 2 - ${theme.spacing('S8')});

  &:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S8')};
  }

  & > h3 {
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};
  }

  & > p {
    margin-top: ${theme.spacing('S8')};
  }

  & > a {
    margin-top: ${theme.spacing('S8')};
  }
`;

export default {
  DatasetsPage,
  BetaRibbon,
  Title,
  Subtitle,
  Section,
  Table,
  TableHead,
  TableBody,
  MetadataCellContents,
  LoadMoreButton,
  PoorQualityIcon,
  SufficientQualityIcon,
  GoodQualityIcon,
  ExcellentQualityIcon,
  FrequentlyAskedQuestions,
  Question
};
