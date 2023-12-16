import styled from 'styled-components';

import { theme, Unit } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 900px)';
const customBreakingPoint = '@media (max-width: 992px)';

const InformationPage = styled.article`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing('S16', Unit.EM)};
  word-break: break-word;

  ${customBreakingPoint} {
    && {
      max-width: fit-content;
    }
  }

  ${onMobileView} {
    flex-direction: column;
  }
`;

const Aside = styled.aside`
  display: flex;
  flex: 0 0 20%;
  flex-direction: column;

  ${onMobileView} {
    flex: 1;
  }
`;

const Article = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing('S10')};
  z-index: 5;
  width: 790px;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48', Unit.REM)};
  font-weight: ${theme.fontWeight('FW500')};
  padding-left: 0;
`;

const Description = styled.p`
  font-size: ${theme.fontSize('FS20')};
`;

const Content = styled.p`
  & > div {
    & > h2 {
      font-size: ${theme.fontSize('FS32', Unit.REM)};
      font-weight: ${theme.fontWeight('FW500')};
      padding: ${theme.spacing('S6')};
      padding-left: 0;
      margin-bottom: ${theme.spacing('S6', Unit.EM)};
      margin-top: ${theme.spacing('S48')};
    }
  }

  & a {
    text-decoration: underline;
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: ${theme.spacing('S16')};
`;

const Image = styled.img`
  max-width: 100%;
`;

const ImageText = styled.span`
  font-size: ${theme.fontSize('FS14', Unit.REM)};
`;

export default {
  InformationPage,
  Aside,
  Article,
  Title,
  Description,
  Content,
  ImageWrapper,
  Image,
  ImageText
};
