import styled, { css } from 'styled-components';
import { Colour, Unit, theme } from '@fellesdatakatalog/theme';

import { getConfig } from '../../../../config';

const isTransportportal = getConfig().themeNap;

const OrganizationPage = styled.article`
  flex: 1 0 auto;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48', Unit.REM)};
  font-weight: ${theme.fontWeight('FW700')};

  @media (max-width: 900px) {
    & {
      font-size: ${theme.fontSize('FS32', Unit.REM)};
      word-break: break-word;
    }
  }
`;

const Section = styled.section`
  margin-top: ${theme.spacing('S40')};
`;

const Box = styled.div`
  flex: 1 1 calc(100% / 5 - 4 * ${theme.spacing('S8')});
  padding: ${theme.spacing('S24')};
  border-radius: 4px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
  margin-bottom: ${theme.spacing('S8')};
`;

const OrganizationInformation = styled.div`
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};
  border-radius: 4px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};

  & > img {
    max-height: 100px;
    max-width: 300px;
    margin-bottom: ${theme.spacing('S16')};

    & + ul > li:first-of-type {
      padding-top: ${theme.spacing('S10')};
      border-top: 1px solid ${theme.colour(Colour.NEUTRAL, 'N20')};
    }
  }

  & > ul > li {
    @media (max-width: 900px) {
      & {
        flex-direction: column;
      }
    }

    display: flex;
    padding: ${theme.spacing('S10')} 0;
    line-height: 26px;

    &:first-of-type {
      padding-top: 0;
    }

    &:nth-of-type(n + 2) {
      border-top: 1px solid ${theme.colour(Colour.NEUTRAL, 'N20')};
    }

    &:last-of-type {
      padding-bottom: 0;
    }

    & > span {
      &:first-of-type {
        width: 225px;
        font-weight: ${theme.fontWeight('FW700')};
      }

      & a > div {
        align-items: center;
        line-height: 1.2;
      }
    }
  }
`;

const CataloguesStatistics = styled.div`
  &:nth-of-type(n + 2) {
    margin-top: ${theme.spacing('S16')};
  }

  & > h2 {
    display: flex;
    align-items: center;
    padding: ${theme.spacing('S12')};
    border-radius: 4px;
    font-size: ${theme.fontSize('FS24', Unit.REM)};
    font-weight: ${theme.fontWeight('FW700')};

    & > svg {
      height: 40px;
      width: 40px;
      min-height: 40px;
      min-width: 40px;
      margin-right: ${theme.spacing('S12')};
    }
  }

  & > div {
    display: flex;
    margin-top: ${theme.spacing('S8')};

    & > ${Box}:nth-of-type(n+2) {
      margin-left: ${theme.spacing('S8')};
    }

    @media (max-width: 900px) {
      & {
        flex-direction: column;
      }
      & > ${Box}:nth-of-type(n+2) {
        margin-left: 0;
      }
    }
  }
`;

const DatasetCataloguesStatistics = styled(CataloguesStatistics)`
  ${() =>
    isTransportportal
      ? css`
          & > h2 {
            background: ${theme.colour(Colour.GREEN, 'G20')};
            color: ${theme.colour(Colour.GREEN, 'G60')};
          }

          & svg {
            * {
              stroke: ${theme.colour(Colour.GREEN, 'G60')};
            }
          }
        `
      : css`
          & > h2 {
            background: ${theme.colour(Colour.BLUE, 'B30')};
            color: ${theme.colour(Colour.BLUE, 'B60')};
          }

          & svg {
            * {
              stroke: ${theme.colour(Colour.BLUE, 'B60')};
            }
          }
        `}
`;

const DataserviceCataloguesStatistics = styled(CataloguesStatistics)`
  & > h2 {
    background: ${theme.colour(Colour.BROWN, 'B30')};
    color: ${theme.colour(Colour.BROWN, 'B60')};
  }

  & svg {
    * {
      stroke: ${theme.colour(Colour.BROWN, 'B60')};
    }
  }
`;

const ConceptCataloguesStatistics = styled(CataloguesStatistics)`
  & > h2 {
    background: ${theme.colour(Colour.CYAN, 'C30')};
    color: ${theme.colour(Colour.CYAN, 'C50')};
  }

  & svg {
    * {
      stroke: ${theme.colour(Colour.CYAN, 'C50')};
    }
  }
`;

const InformationModelCataloguesStatistics = styled(CataloguesStatistics)`
  & > h2 {
    background: ${theme.colour(Colour.VIOLET, 'V30')};
    color: ${theme.colour(Colour.VIOLET, 'V60')};
  }

  & svg {
    * {
      stroke: ${theme.colour(Colour.VIOLET, 'V60')};
    }
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
    font-size: ${theme.fontSize('FS24', Unit.REM)};
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
  OrganizationPage,
  Title,
  Section,
  Box,
  OrganizationInformation,
  DatasetCataloguesStatistics,
  DataserviceCataloguesStatistics,
  ConceptCataloguesStatistics,
  InformationModelCataloguesStatistics,
  FrequentlyAskedQuestions,
  Question
};
