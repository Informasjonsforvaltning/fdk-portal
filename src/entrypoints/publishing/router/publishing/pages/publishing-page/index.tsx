import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import env from '../../../../../../env';

import Translation from '../../../../../../components/translation';

import SC from './styled';

const { FDK_REGISTRATION_BASE_URI, ADMIN_GUI_BASE_URI } = env;

interface Props extends RouteComponentProps {}

const PublishingPage: FC<Props> = ({ match: { url } }) => (
  <SC.PublishingPage>
    <SC.Title>
      <Translation id="publishingPage.title" />
    </SC.Title>
    <SC.Description>
      <Translation id="publishingPage.description" />
    </SC.Description>
    <SC.MethodsSection>
      <SC.RegisterData>
        <h2>
          <Translation id="publishingPage.methodSections.register.title" />
        </h2>
        <p>
          <Translation id="publishingPage.methodSections.register.description" />
        </p>
        <a href={FDK_REGISTRATION_BASE_URI}>
          <Translation id="publishingPage.methodSections.register.cta" />
        </a>
        <p>
          <Translation id="publishingPage.methodSections.register.question" />
        </p>
        <Link to={`${url}/about-registration`} component={SC.Link}>
          <Translation id="publishingPage.methodSections.register.link" />
        </Link>
        <SC.RegisterIllustration />
      </SC.RegisterData>
      <SC.HarvestData>
        <h2>
          <Translation id="publishingPage.methodSections.harvest.title" />
        </h2>
        <p>
          <Translation id="publishingPage.methodSections.harvest.description" />
        </p>
        <a href={ADMIN_GUI_BASE_URI}>
          <Translation id="publishingPage.methodSections.harvest.cta" />
        </a>
        <p>
          <Translation id="publishingPage.methodSections.harvest.question" />
        </p>
        <Link to={`${url}/about-harvesting`} component={SC.Link}>
          <Translation id="publishingPage.methodSections.harvest.link" />
        </Link>
        <SC.HarvestIllustration />
      </SC.HarvestData>
    </SC.MethodsSection>
    <SC.InformationSection>
      <SC.InformationBox>
        <h3>
          <Link to={`${url}/about-registration`}>
            <Translation id="publishingPage.informationSections.getStartedHelp.title" />
          </Link>
        </h3>
        <p>
          <Translation id="publishingPage.informationSections.getStartedHelp.description" />
        </p>
        <ul>
          <li>
            <SC.Link href={`${url}/about-registration#id-porten`}>
              <Translation id="publishingPage.informationSections.getStartedHelp.logInMethodIdPortenLink" />
            </SC.Link>
          </li>
          <li>
            <SC.Link href={`${url}/about-registration#felles-brukerhandtering`}>
              <Translation id="publishingPage.informationSections.getStartedHelp.logInMethodFdkLink" />
            </SC.Link>
          </li>
        </ul>
      </SC.InformationBox>
      <SC.InformationBox>
        <h3>
          <a href="/guidance">
            <Translation id="publishingPage.informationSections.usefulInfo.title" />
          </a>
        </h3>
        <p>
          <Translation id="publishingPage.informationSections.usefulInfo.description" />
        </p>
        <ul>
          <li>
            <SC.Link href="https://informasjonsforvaltning.github.io/dcat-ap-no">
              <Translation id="publishingPage.informationSections.usefulInfo.datasetsStandardLink" />
            </SC.Link>
          </li>
          <li>
            <SC.Link href="https://doc.difi.no/data/veileder-apne-data">
              <Translation id="publishingPage.informationSections.usefulInfo.registrationGuidanceLink" />
            </SC.Link>
          </li>
          <li>
            <SC.Link href="https://data.norge.no/nlod/no">
              <Translation id="publishingPage.informationSections.usefulInfo.norwegianPublicLicenseLink" />
            </SC.Link>
          </li>
        </ul>
      </SC.InformationBox>
    </SC.InformationSection>
  </SC.PublishingPage>
);

export default compose<FC>(memo)(PublishingPage);
