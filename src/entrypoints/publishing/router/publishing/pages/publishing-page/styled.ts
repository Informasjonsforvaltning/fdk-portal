import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';

import RegisterIllustrationSVG from '../../../../../../images/illustration-register.svg';
import HarvestIllustrationSVG from '../../../../../../images/illustration-harvest.svg';

const PublishingPage = styled.article`
  flex: 1;
  margin-top: ${theme.spacing('S48')};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const Description = styled.p`
  margin-top: ${theme.spacing('S24')};
  font-size: ${theme.fontSize('FS24')};
  line-height: 1.5;
`;

const Section = styled.section`
  margin-top: ${theme.spacing('S40')};
`;

const Link = styled(LinkBase)`
  line-height: 1;
`;

const MethodsSection = styled(Section)`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
`;

const MethodContainer = styled.div`
  flex: 1;
  position: relative;
  padding: ${theme.spacing('S40')} ${theme.spacing('S32')};

  & > h2 {
    font-size: ${theme.fontSize('FS28')};
    font-weight: ${theme.fontWeight('FW700')};
  }

  & > p {
    margin-top: ${theme.spacing('S12')};
  }

  & > a:first-of-type {
    display: inline-flex;
    margin-top: ${theme.spacing('S16')};
    margin-bottom: ${theme.spacing('S32')};
    padding: ${theme.spacing('S8')} ${theme.spacing('S24')};
    outline: none;
    border: none;
    appearance: none;
    background: ${theme.colour(Colour.NEUTRAL, 'N60')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    border-radius: 4px;
    box-shadow: 0 2px 4px ${theme.colour(Colour.NEUTRAL, 'N60', 25)};
    text-decoration: none;
  }

  & > ${Link} {
    margin-top: ${theme.spacing('S8')};
    margin-bottom: ${theme.spacing('S32')};
  }
`;

const RegisterData = styled(MethodContainer)`
  background: ${theme.colour(Colour.BLUE, 'B30')};
`;

const RegisterIllustration = styled(RegisterIllustrationSVG)`
  position: absolute;
  bottom: ${theme.spacing('S24')};
  right: ${theme.spacing('S24')};
  height: 125px;
`;

const HarvestData = styled(MethodContainer)`
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const HarvestIllustration = styled(HarvestIllustrationSVG)`
  position: absolute;
  bottom: ${theme.spacing('S24')};
  right: ${theme.spacing('S24')};
  height: 125px;
`;

const InformationSection = styled(Section)`
  display: flex;
  margin-top: ${theme.spacing('S64')};
`;

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;

  &:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S24')};
  }

  & > h3 {
    font-size: ${theme.fontSize('FS20')};
    font-weight: ${theme.fontWeight('FW700')};
    border-bottom: 2px solid ${theme.colour(Colour.NEUTRAL, 'N60')};
  }

  & > p {
    margin-top: ${theme.spacing('S12')};
    line-height: 1.5;
  }

  & > ul {
    margin-top: ${theme.spacing('S12')};
    padding-left: ${theme.spacing('S6')};

    & > li {
      display: flex;
      align-items: center;

      &:nth-of-type(n + 2) {
        margin-top: ${theme.spacing('S12')};
      }

      &:before {
        content: '';
        display: block;
        height: 7px;
        width: 7px;
        margin-right: ${theme.spacing('S8')};
        border-top: 1px solid black;
        border-right: 1px solid black;
        transform: rotate(45deg);
      }
    }
  }
`;

export default {
  PublishingPage,
  Title,
  Description,
  Link,
  MethodsSection,
  RegisterData,
  RegisterIllustration,
  HarvestData,
  HarvestIllustration,
  InformationSection,
  InformationBox
};
