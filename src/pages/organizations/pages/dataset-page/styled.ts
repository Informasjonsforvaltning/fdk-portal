import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import { SC as ExpansionPanelSC } from '../../../../components/expansion-panel';

import DatasetSVG from '../../../../images/icon-catalog-dataset-lg.svg';
import AuthoritativeSVG from '../../../../images/icon-authoritative-md.svg';
import MetadataQualityExcellentSVG from '../../../../images/icon-quality-excellent-md.svg';
import MetadataQualityGoodSVG from '../../../../images/icon-quality-good-md.svg';
import MetadataQualitySufficientSVG from '../../../../images/icon-quality-sufficient-md.svg';
import MetadataQualityPoorSVG from '../../../../images/icon-quality-poor-md.svg';
import CheckSVG from '../../../../images/icon-checked-sm.svg';
import CrossSVG from '../../../../images/icon-empty-search-sm.svg';

const DatasetPage = styled.article`
  flex: 1 0 auto;
`;

const Banner = styled.header`
  position: relative;
  width: 100%;
  padding: 18px;
  border-radius: 5px;
  color: ${theme.colour(Colour.BLUE, 'B50')};
  background: ${theme.colour(Colour.BLUE, 'B30')};
  overflow: hidden;

  & > h1 {
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};
  }

  & > div {
    display: flex;
    margin-top: ${theme.spacing('S10')};
  }
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

const DatasetIcon = styled(DatasetSVG)`
  height: 42px;
  width: 42px;
  min-height: 42px;
  min-width: 42px;

  & path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const Title = styled.h2`
  display: flex inline;
  font-size: ${theme.fontSize('FS40')};
  font-weight: ${theme.fontWeight('FW700')};
  margin-left: ${theme.spacing('S12')};

  & > div {
    display: inline;
  }
`;

const AuthoritativeIcon = styled(AuthoritativeSVG)`
  height: 24px;
  width: 24px;
  min-height: 24px;
  min-width: 24px;
  margin-left: ${theme.spacing('S12')};
  margin-top: -3px;

  & path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const Section = styled.section`
  margin-top: ${theme.spacing('S40')};
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  th {
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacing('S12')};

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

  tbody {
    & > tr {
      color: ${theme.colour(Colour.BLUE, 'B50')};

      &.section-row > td > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${theme.spacing('S12')};
        font-weight: ${theme.fontWeight('FW700')};

        & > div {
          display: flex;
          align-items: center;
          margin-right: 26px;

          & > svg {
            height: 30px;
            width: 30px;
            min-height: 30px;
            min-width: 30px;
            margin: 0;
            margin-right: ${theme.spacing('S8')};
          }

          & > span {
            min-width: 40px;
          }
        }
      }
    }

    &
      ${ExpansionPanelSC.ExpansionPanel.Head},
      ${ExpansionPanelSC.ExpansionPanel.Body} {
      padding: ${theme.spacing('S12')} ${theme.spacing('S16')};
      padding-left: ${theme.spacing('S32')};
      cursor: pointer;
    }

    & ${ExpansionPanelSC.ExpansionPanel.HeadContent} {
      display: flex;

      & svg {
        height: 24px;
        width: 24px;
        min-height: 24px;
        min-width: 24px;
        margin: 0;
        margin-right: ${theme.spacing('S12')};
      }
    }

    & ${ExpansionPanelSC.ExpansionPanel.Body} {
      & span {
        display: flex;
        margin-top: ${theme.spacing('S8')};
      }
    }
  }
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

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

const CheckIcon = styled(CheckSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const CrossIcon = styled(CrossSVG)`
  & > path {
    fill: ${theme.colour(Colour.BLUE, 'B30')};
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
  DatasetPage,
  BetaRibbon,
  Banner,
  DatasetIcon,
  Title,
  AuthoritativeIcon,
  Section,
  Table,
  TableHead,
  TableBody,
  PoorQualityIcon,
  SufficientQualityIcon,
  GoodQualityIcon,
  ExcellentQualityIcon,
  CheckIcon,
  CrossIcon,
  FrequentlyAskedQuestions,
  Question
};
