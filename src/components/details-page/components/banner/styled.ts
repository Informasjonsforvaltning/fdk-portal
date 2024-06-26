import styled from 'styled-components';
import { theme, Unit } from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

import { SC } from '../../../multilingual-field';
import type { InvertedColorProps } from '../../../../types';

const onMobileView = '@media (max-width: 768px)';

const Banner = styled.header<InvertedColorProps>`
  display: flex;
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  & svg > path {
    fill: ${({ theme: t, inverted }) =>
      inverted ? t.entityColours.light : t.entityColours.dark};
  }

  & > svg {
    height: 42px;
    width: 42px;
    min-height: 42px;
    min-width: 42px;

    ${onMobileView} {
      height: 20px;
      width: 20px;
      min-height: 20px;
      min-width: 20px;
    }
  }
`;

const Content = styled.div`
  & > ${SC.MultiLingualField.MultiLingualField} {
    font-size: ${theme.fontSize('FS20', Unit.EM)};
    font-weight: ${theme.fontWeight('FW500')};
  }
`;

const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Title = styled.h1`
  display: flex inline;
  margin: 0;
  font-size: ${theme.fontSize('FS40', Unit.REM)};
  font-weight: bold;

  svg {
    height: 24px;
    width: 24px;
    min-height: 24px;
    min-width: 24px;
    margin-left: 12px;
    margin-top: -3px;
  }

  div {
    display: inline;
  }

  ${onMobileView} {
    font-size: ${theme.fontSize('FS24', Unit.REM)};
    white-space: normal;
    word-wrap: break-word;
  }
`;

const ResourceType = styled.h3`
  font-weight: bold;
  margin-right: 1rem;
`;

const PublisherLink = styled(Link)`
  margin: 0;
  font-size: ${theme.fontSize('FS20', Unit.REM)};
  ${onMobileView} {
    font-size: ${theme.fontSize('FS16', Unit.REM)};
  }
`;

const BannerInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  margin-top: 8px;
  font-size: ${theme.fontSize('FS20', Unit.REM)};

  ${onMobileView} {
    font-size: ${theme.fontSize('FS16', Unit.REM)};
  }
`;

const Status = styled.p`
  margin-top: 8px;
  font-size: ${theme.fontSize('FS20', Unit.REM)};
`;

const Dot = styled.p`
  margin: 8px ${theme.spacing('S6')} 0px ${theme.spacing('S6')};
  font-weight: bold;
  font-size: ${theme.fontSize('FS20', Unit.REM)};
`;

const SecondTitles = styled.h2`
  font-style: italic;
  font-weight: normal;
`;

const SecondTitlesWrapped = styled.div`
  display: flex;
`;

const TitleLanguage = styled.span`
  padding-left: 1rem;
`;

const Hyphen = styled.span`
  padding-left: 5px;
  padding-right: 5px;
`;

export default {
  Banner,
  Content,
  TitleWrapper,
  Title,
  ResourceType,
  PublisherLink,
  Status,
  BannerInfo,
  Dot,
  SecondTitles,
  TitleLanguage,
  SecondTitlesWrapped,
  Hyphen
};
