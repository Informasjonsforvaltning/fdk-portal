import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const OrganizationPage = styled.article`
  flex: 1 0 auto;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const Section = styled.section`
  margin-top: ${theme.spacing('S40')};
`;

const Box = styled.div<{ colspan?: number }>`
  flex: 1 0 auto;
  padding: ${theme.spacing('S24')};
  border-radius: 4px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};

  ${({ colspan }) => {
    switch (colspan) {
      case 2:
        return css`
          min-width: calc(100% / 2 - ${theme.spacing('S8')});
        `;
      default:
        return css`
          min-width: calc(100% / 4 - 3 * ${theme.spacing('S8')});
        `;
    }
  }}
`;

const OrganizationInformation = styled.div`
  padding: ${theme.spacing('S24')};
  border-radius: 4px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const AllCataloguesStatistics = styled.div`
  & > h2 {
    display: flex;
    align-items: center;
    padding: ${theme.spacing('S12')};
    border-radius: 4px;
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};
    background: ${theme.colour(Colour.NEUTRAL, 'N20')};
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};

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
  }
`;

const DatasetCataloguesStatistics = styled.div`
  & > h2 {
    display: flex;
    align-items: center;
    padding: ${theme.spacing('S12')};
    border-radius: 4px;
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};
    background: ${theme.colour(Colour.BLUE, 'B30')};
    color: ${theme.colour(Colour.BLUE, 'B50')};

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
  OrganizationPage,
  Title,
  Section,
  Box,
  OrganizationInformation,
  AllCataloguesStatistics,
  DatasetCataloguesStatistics,
  FrequentlyAskedQuestions,
  Question
};
