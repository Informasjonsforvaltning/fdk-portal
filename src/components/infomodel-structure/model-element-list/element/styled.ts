import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import Scroll from 'react-scroll';

import ExpansionPanelBase, { SC } from '../../../expansion-panel';

import { ModelElementType } from '../../../../types/enums';

const ElementTitle = styled.span<{ $type: ModelElementType }>`
  display: flex;
  align-items: center;
  align-self: start;

  &:before {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    margin-right: ${theme.spacing('S8')};

    ${({ $type }) => {
      switch ($type) {
        case ModelElementType.ATTRIBUTE:
          return css`
            content: '\\2022';
            transform: scale(2) translateY(1px);
          `;
        case ModelElementType.ROLE:
          return css`
            content: '\\2192';
          `;
        case ModelElementType.ASSOCIATION:
          return css`
            content: '-';
            transform: scale(1.4);
          `;
        case ModelElementType.CODE_ELEMENT:
          return css`
            content: '\\25A0';
            transform: scale(1.5) translateY(1px);
          `;
        case ModelElementType.SPECIALIZATION:
          return css`
            content: '\\21FE';
            transform: scale(1.5) translateY(-2px);
          `;
        case ModelElementType.CHOICE:
          return css`
            content: '\\2299';
          `;
        case ModelElementType.MULTIPLE_CHOICE:
          return css`
            content: '\\2611';
          `;
        case ModelElementType.COLLECTION:
          return css`
            content: '\\25C7';
          `;
        case ModelElementType.COMPOSITION:
          return css`
            content: '\\25C6';
          `;
        default:
          return css`
            content: '';
          `;
      }
    }}
  }
`;

const ExpansionPanel = styled(ExpansionPanelBase)`
  border-radius: none;
  border-bottom: 1px solid ${theme.colour(Colour.VIOLET, 'V30')};
  background: transparent;

  ${SC.ExpansionPanel.Head} {
    padding: ${theme.spacing('S8')} 0;
  }

  ${SC.ExpansionPanel.HeadContent} {
    display: flex;
    flex: 0 0 80%;
    align-items: center;

    & > * {
      font-size: ${theme.fontSize('FS16')};
      font-weight: ${theme.fontWeight('FW400')};
      color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    }

    & > ${ElementTitle} {
      flex-basis: 60%;
    }

    & > span:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      & > a:nth-of-type(n + 2) {
        margin-top: ${theme.spacing('S8')};
      }
    }
  }
`;

const ScrollLink = styled(Scroll.Link)`
  color: ${theme.colour(Colour.VIOLET, 'V50')} !important;
`;

const MultiplicityRange = styled.span`
  align-self: flex-start;
`;

const ElementTypesContainer = styled.span`
  padding-top: ${theme.spacing('S8')};
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & > a:nth-of-type(n + 2) {
    margin-top: ${theme.spacing('S8')};
  }
`;

export default {
  ElementTitle,
  ExpansionPanel,
  ScrollLink,
  MultiplicityRange,
  ElementTypesContainer
};
