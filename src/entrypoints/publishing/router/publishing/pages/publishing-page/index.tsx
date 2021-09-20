import React, { FC, memo } from 'react';
import { compose } from 'redux';
import { Link as RouteLink, RouteComponentProps } from 'react-router-dom';
import Link from '@fellesdatakatalog/link';

import env from '../../../../../../env';

import Translation from '../../../../../../components/translation';
import {
  useGetServiceMessagesQuery,
  ServiceMessage,
  Enum_Servicemessage_Channel
} from '../../../../../../api/generated/cms/graphql';

import ServiceMessages from '../../../../../../components/service-messages';

import SC from './styled';

const { FDK_REGISTRATION_BASE_URI, ADMIN_GUI_BASE_URI } = env;

interface Props extends RouteComponentProps {}

const PublishingPage: FC<Props> = ({ match: { url } }) => {
  const date = new Date();
  const now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  const { data } = useGetServiceMessagesQuery({
    variables: {
      channel: Enum_Servicemessage_Channel.Publiseringsportal,
      today: new Date(now_utc)
    }
  });
  const serviceMessages = data?.serviceMessages as ServiceMessage[];
  return (
    <SC.PublishingPage>
      {serviceMessages?.length > 0 && (
        <ServiceMessages serviceMessages={serviceMessages} />
      )}
      <SC.Title>
        <Translation id='publishingPage.title' />
      </SC.Title>
      <SC.Description>
        <Translation id='publishingPage.description' />
      </SC.Description>
      <SC.MethodsSection>
        <SC.RegisterData>
          <h2>
            <Translation id='publishingPage.methodSections.register.title' />
          </h2>
          <p>
            <Translation id='publishingPage.methodSections.register.description' />
          </p>
          <a href={FDK_REGISTRATION_BASE_URI}>
            <Translation id='publishingPage.methodSections.register.cta' />
          </a>
          <p>
            <Translation id='publishingPage.methodSections.register.question' />
          </p>
          <Link to={`${url}/about-registration`} as={RouteLink}>
            <Translation id='publishingPage.methodSections.register.link' />
          </Link>
          <SC.RegisterIllustration />
        </SC.RegisterData>
        <SC.HarvestData>
          <h2>
            <Translation id='publishingPage.methodSections.harvest.title' />
          </h2>
          <p>
            <Translation id='publishingPage.methodSections.harvest.description' />
          </p>
          <a href={ADMIN_GUI_BASE_URI}>
            <Translation id='publishingPage.methodSections.harvest.cta' />
          </a>
          <p>
            <Translation id='publishingPage.methodSections.harvest.question' />
          </p>
          <Link to={`${url}/about-harvesting`} as={RouteLink}>
            <Translation id='publishingPage.methodSections.harvest.link' />
          </Link>
          <SC.HarvestIllustration />
        </SC.HarvestData>
      </SC.MethodsSection>
      <SC.InformationSection>
        <SC.InformationBox>
          <h3>
            <RouteLink to={`${url}/about-registration`}>
              <Translation id='publishingPage.informationSections.getStartedHelp.title' />
            </RouteLink>
          </h3>
          <p>
            <Translation id='publishingPage.informationSections.getStartedHelp.description' />
          </p>
          <ul>
            <li>
              <Link href={`${url}/about-registration#id-porten`}>
                <Translation id='publishingPage.informationSections.getStartedHelp.logInMethodIdPortenLink' />
              </Link>
            </li>
            <li>
              <Link href={`${url}/about-registration#felles-brukerhandtering`}>
                <Translation id='publishingPage.informationSections.getStartedHelp.logInMethodFdkLink' />
              </Link>
            </li>
          </ul>
        </SC.InformationBox>
        <SC.InformationBox>
          <h3>
            <a href='/guidance'>
              <Translation id='publishingPage.informationSections.usefulInfo.title' />
            </a>
          </h3>
          <p>
            <Translation id='publishingPage.informationSections.usefulInfo.description' />
          </p>
          <ul>
            <li>
              <Link href='https://informasjonsforvaltning.github.io/dcat-ap-no'>
                <Translation id='publishingPage.informationSections.usefulInfo.datasetsStandardLink' />
              </Link>
            </li>
            <li>
              <Link href='https://doc.difi.no/data/veileder-apne-data'>
                <Translation id='publishingPage.informationSections.usefulInfo.registrationGuidanceLink' />
              </Link>
            </li>
            <li>
              <Link href='https://data.norge.no/nlod/no'>
                <Translation id='publishingPage.informationSections.usefulInfo.norwegianPublicLicenseLink' />
              </Link>
            </li>
            <li>
              <Link href='/validator'>
                <Translation id='publishingPage.informationSections.usefulInfo.validatorLink' />
              </Link>
            </li>
          </ul>
        </SC.InformationBox>
      </SC.InformationSection>
    </SC.PublishingPage>
  );
};

export default compose<FC>(memo)(PublishingPage);
