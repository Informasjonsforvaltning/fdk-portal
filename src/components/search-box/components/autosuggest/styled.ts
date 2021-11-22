import { theme, Colour } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';
import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodelIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import PublicServiceIconBase from '../../../../images/icon-catalog-service-lg.svg';

const SuggestionsContainer = styled.ul`
  display: flex;
  flex-direction: column;

  width: 60%;
  box-sizing: content-box;

  position: absolute;
  z-index: 999;
  top: 4em;
  margin: auto;
  overflow: hidden;

  border: 1px solid ${({ theme: t }) => t.extendedColors.neutralDarker};
  border-radius: 0px 0px 5px 5px;
  border-top: 0;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const highlightStyle = css`
  background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
`;

const Suggestion = styled.li<{ $highlighted: boolean }>`
  color: ${({ theme: t }) => t.extendedColors.neutralDarker};
  font-size: ${theme.fontSize('FS16')};
  padding: ${theme.spacing('S8')};
  cursor: pointer;

  &:hover,
  :focus {
    ${highlightStyle}
  }

  ${({ $highlighted }) => ($highlighted ? highlightStyle : null)}
`;

const SuggestionDivider = styled.hr`
  width: 75%;
  align-self: center;
  padding: 0px;
  margin: 0px;

  margin-top: ${theme.spacing('S8')};
`;

const AutosuggestContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  &:not(:focus-within) {
    border-radius: 5px;

    & > ${SuggestionsContainer} {
      visibility: hidden;
    }
  }
`;

const iconStyle = (entity: string) => css`
  width: 30px;
  height: 30px;
  padding: ${theme.spacing('S4')};
  margin-right: ${theme.spacing('S4')};
  background-color: ${({ theme: t }) => t.extendedColors[entity].light};
  border-radius: 50%;
  & > path {
    fill: ${({ theme: t }) => t.extendedColors[entity].dark};
  }
`;

const DatasetIcon = styled(DatasetIconBase)`
  ${iconStyle('dataset')}
`;

const DataServiceIcon = styled(ApiIconBase)`
  ${iconStyle('dataservice')};
`;

const ConceptIcon = styled(ConceptIconBase)`
  ${iconStyle('concept')};
`;

const InfomodelIcon = styled(InfomodelIconBase)`
  ${iconStyle('informationmodel')};
`;

const PublicServiceIcon = styled(PublicServiceIconBase)`
  ${iconStyle('publicservice')};
`;

export default {
  Suggestion,
  SuggestionDivider,
  SuggestionsContainer,
  AutosuggestContainer,
  DatasetIcon,
  PublicServiceIcon,
  ConceptIcon,
  InfomodelIcon,
  DataServiceIcon
};
