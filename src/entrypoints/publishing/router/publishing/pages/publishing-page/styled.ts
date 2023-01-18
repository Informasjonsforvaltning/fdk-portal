import styled from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';

import RegisterIllustrationSVG from '../../../../../../images/illustration-register.svg';
import HarvestIllustrationSVG from '../../../../../../images/illustration-harvest.svg';

const PublishingPage = styled.article`
  flex: 1;
  margin-top: ${theme.spacing('S48')};

  @media (max-width: 1020px) {
    & {
      margin-top: calc(24px + (48 - 24) * ((100vw - 320px) / (1020 - 320)));
    }
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48', Unit.REM)};
  font-weight: ${theme.fontWeight('FW700')};
`;

const Description = styled.p`
  margin-top: ${theme.spacing('S24')};
  font-size: ${theme.fontSize('FS24', Unit.REM)};
  line-height: ${theme.spacing('S16', Unit.REM)};

  @media (max-width: 1020px) {
    & {
      margin-top: calc(16px + (24 - 16) * ((100vw - 320px) / (1020 - 320)));
    }
  }
`;

const Section = styled.section`
  margin-top: ${theme.spacing('S40')};

  @media (max-width: 1020px) {
    & {
      margin-top: calc(20px + (40 - 20) * ((100vw - 320px) / (1020 - 320)));
    }
  }
`;

const MethodsSection = styled(Section)`
  display: flex;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 1020px) {
    & {
      flex-direction: column;
    }
  }
`;

const MethodContainer = styled.div`
  flex: 1;
  position: relative;
  padding: ${theme.spacing('S40')} ${theme.spacing('S32')};

  & > h2 {
    font-size: ${theme.fontSize('FS28', Unit.REM)};
    font-weight: ${theme.fontWeight('FW700')};
  }

  & > p {
    margin-top: ${theme.spacing('S12')};

    @media (max-width: 400px) {
      & {
        font-size: ${theme.fontSize('FS14', Unit.REM)};
      }
    }
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

    &:focus {
      outline-offset: 3px;
      outline: 2px solid orange;
    }

    @media (max-width: 900px) {
      & {
        margin-bottom: ${theme.spacing('S12')};
      }
    }

    @media (max-width: 400px) {
      & {
        padding: ${theme.spacing('S8')} ${theme.spacing('S16')};
        font-size: ${theme.fontSize('FS14', Unit.REM)};
      }
    }
  }

  & > a {
    margin-top: ${theme.spacing('S8')};
    margin-bottom: ${theme.spacing('S32')};

    @media (max-width: 400px) {
      & {
        font-size: ${theme.fontSize('FS14', Unit.REM)};
      }
    }
  }

  @media (max-width: 600px) {
    & {
      padding: ${theme.spacing('S24')} ${theme.spacing('S16')};
    }
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

  @media (max-width: 1100px) {
    & {
      height: auto;
      width: 30%;
    }
  }

  @media (max-width: 1020px) {
    & {
      height: 125px;
      width: auto;
    }
  }

  @media (max-width: 600px) {
    & {
      display: block;
      position: relative;
      bottom: auto;
      right: auto;
      height: auto;
      width: 40%;
      margin-left: auto;
      margin-top: -45px;
    }
  }

  @media (max-width: 490px) {
    & {
      height: 80px;
      width: auto;
      margin-top: -15px;
    }
  }
`;

const HarvestData = styled(MethodContainer)`
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const HarvestIllustration = styled(HarvestIllustrationSVG)`
  position: absolute;
  bottom: ${theme.spacing('S24')};
  right: ${theme.spacing('S24')};
  height: 125px;

  @media (max-width: 1100px) {
    & {
      height: auto;
      width: 30%;
    }
  }

  @media (max-width: 1020px) {
    & {
      height: 125px;
      width: auto;
    }
  }

  @media (max-width: 600px) {
    & {
      display: block;
      position: relative;
      bottom: auto;
      right: auto;
      height: auto;
      width: 40%;
      margin-left: auto;
      margin-top: -45px;
    }
  }

  @media (max-width: 490px) {
    & {
      height: 80px;
      width: auto;
      margin-top: -15px;
    }
  }
`;

const InformationSection = styled(Section)`
  display: flex;
  margin-top: ${theme.spacing('S64')};

  @media (max-width: 1020px) {
    & {
      flex-direction: column;
    }
  }
`;

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;

  &:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S24')};

    @media (max-width: 1020px) {
      & {
        margin-left: 0;
        margin-top: ${theme.spacing('S24')};
      }
    }
  }

  & > h3 {
    font-size: ${theme.fontSize('FS20', Unit.REM)};
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

    @media (max-width: 400px) {
      & {
        font-size: ${theme.fontSize('FS14', Unit.REM)};
      }
    }
  }
`;

export default {
  PublishingPage,
  Title,
  Description,
  MethodsSection,
  RegisterData,
  RegisterIllustration,
  HarvestData,
  HarvestIllustration,
  InformationSection,
  InformationBox
};
