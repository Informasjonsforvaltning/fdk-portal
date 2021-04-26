import styled, { css } from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import SearchBoxHeaderSC from '../search-box-header/styled';
import SearchBoxBackground from '../../../../img/illustration-search-dark.svg';
import { getConfig } from '../../../../config';

const isTransportPortal = getConfig().themeNap;

const SearchBox = styled.section`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top right;
  background-image: url(${SearchBoxBackground});
  display: flex;
  flex-flow: column;
  font-size: 1.6rem;
  margin-bottom: 1em;

  ${({ theme: extendedTheme }) =>
    isTransportPortal
      ? css`
          background-color: ${extendedTheme.extendedColors.neutralDarkest};
          color: ${extendedTheme.extendedColors.neutralLightest};
        `
      : css`
          background-color: ${theme.colour(Colour.NEUTRAL, 'N60')};
          color: ${theme.colour(Colour.NEUTRAL, 'N0')};
        `}

  @media (max-width: 900px) {
    background-size: 60%;
    font-size: 1.1rem;
  }
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-flow: column;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 4em;
  margin-top: 4em;

  @media (min-width: 768px) {
    max-width: 720px;
    width: 100%;
  }

  @media (min-width: 992px) {
    max-width: 960px;
    width: 100%;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
    width: 100%;
  }

  ${SearchBoxHeaderSC.SearchBoxHeader} {
    margin-bottom: 1em;
    text-align: center;
  }
`;

const SearchLinks = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-top: 4em;
  width: 100%;

  @media (min-width: 992px) {
    flex-flow: row;
  }
`;

const SearchHeaderLogosTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
`;

export default {
  SearchBox,
  Content,
  SearchLinks,
  SearchHeaderLogosTitle
};
