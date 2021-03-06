import React, {
  memo,
  FC,
  PropsWithChildren,
  useEffect,
  Children,
  isValidElement,
  useState
} from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FdkLink from '@fellesdatakatalog/link';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import {
  PATHNAME_DATASETS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_EVENTS
} from '../../../../constants/constants';

import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../with-reference-data';
import withAssessment, {
  Props as AssessmentProps
} from '../../../with-assessment';

import Banner from '../banner';
import ContentSection from '../content-section';

import { isLosTheme, isEuTheme } from '../../../../utils/common';

import OpenAccessIcon from '../../../../images/icon-access-open-md.svg';
import PublicAccessIcon from '../../../../images/icon-access-public-md.svg';
import RestrictedAccessIcon from '../../../../images/icon-access-restricted-md.svg';
import NonPublicAccessIcon from '../../../../images/icon-access-non-public-md.svg';

import SC from './styled';

import { Publisher, Theme } from '../../../../types';
import { Entity } from '../../../../types/enums';

import {
  determineRatingIcon,
  calculateRatingPercentage
} from '../../../../pages/organizations/pages/dataset-page/index';

interface ExternalProps {
  entity: Entity;
  title: string;
  publisher?: Partial<Publisher>;
  entityId?: string;
  entityUri?: string;
  lastPublished: string;
  isAuthoritative: boolean;
  isOpenData: boolean;
  isPublicData: boolean;
  isRestrictedData: boolean;
  isNonPublicData: boolean;
  themes: Theme[];
}

interface Props extends ReferenceDataProps, AssessmentProps, ExternalProps {}

const rootPaths = {
  [Entity.DATASET]: PATHNAME_DATASETS,
  [Entity.DATA_SERVICE]: PATHNAME_DATA_SERVICES,
  [Entity.CONCEPT]: PATHNAME_CONCEPTS,
  [Entity.INFORMATION_MODEL]: PATHNAME_INFORMATIONMODELS,
  [Entity.PUBLIC_SERVICE]: PATHNAME_PUBLIC_SERVICES,
  [Entity.EVENT]: PATHNAME_EVENTS
};

const DetailsPage: FC<PropsWithChildren<Props>> = ({
  entity,
  title,
  publisher,
  assessment,
  entityId,
  entityUri,
  lastPublished,
  isAuthoritative,
  isOpenData,
  isPublicData,
  isRestrictedData,
  isNonPublicData,
  themes = [],
  referenceData: { los: losThemes, themes: euThemes },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  assessmentActions: { getAssessmentRequested: getAssessment },
  children
}) => {
  useEffect(() => {
    const appRoot = document.querySelector('#root > div');
    appRoot?.classList.add(entity);
    return () => appRoot?.classList.remove(entity);
  });

  useEffect(() => {
    if (!losThemes) {
      getReferenceData('los');
    }
    if (!euThemes) {
      getReferenceData('themes');
    }
  }, []);

  useEffect(() => {
    if (entityUri && entityUri !== assessment?.entity.uri) {
      getAssessment(entityUri);
    }
  }, [entityUri]);

  const [navOpen, setNavOpen] = useState(false);

  const renderContentSections = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === ContentSection ? child : null
    )?.filter(Boolean);

  const menuItems = Children.map(children, child =>
    isValidElement(child) && child.type === ContentSection
      ? { id: child.props.id, title: child.props.title }
      : null
  )?.filter(Boolean);

  const publisherLabel = {
    [Entity.DATASET]: translations.detailsPage.owner,
    [Entity.DATA_SERVICE]: translations.detailsPage.provider,
    [Entity.CONCEPT]: translations.detailsPage.responsible,
    [Entity.INFORMATION_MODEL]: translations.detailsPage.responsible,
    [Entity.PUBLIC_SERVICE]: translations.detailsPage.provider,
    [Entity.EVENT]: translations.detailsPage.provider
  };

  const publisherName = translate(publisher?.prefLabel || publisher?.name);

  return (
    <SC.DetailsPage className='container'>
      <Banner
        entity={entity}
        title={title}
        lastPublished={lastPublished}
        isAuthoritative={isAuthoritative}
      />
      <SC.SubBanner>
        <SC.Publisher>
          {translations.formatString(publisherLabel[entity], {
            publisher: publisherName
          })}
        </SC.Publisher>
        {assessment && publisher && (
          <FdkLink href={`/organizations/${publisher.id}/datasets/${entityId}`}>
            <SC.MetadataQuality>
              <p>{translations.metadataQualityPage.metadataQuality}: </p>
              <SC.RatingIcon>
                {determineRatingIcon(assessment.rating)}
              </SC.RatingIcon>
              <p>{calculateRatingPercentage(assessment.rating)} %</p>
            </SC.MetadataQuality>
          </FdkLink>
        )}
      </SC.SubBanner>
      <SC.Themes>
        {isOpenData && (
          <Link to={`${rootPaths[entity]}?opendata=true`} className='open-data'>
            <OpenAccessIcon />
            {translations.detailsPage.openData}
          </Link>
        )}
        {isPublicData && (
          <Link
            to={`${rootPaths[entity]}?accessrights=PUBLIC`}
            className='public-data'
          >
            <PublicAccessIcon />
            {translations.detailsPage.publicData}
          </Link>
        )}
        {isRestrictedData && (
          <Link
            to={`${rootPaths[entity]}?accessrights=RESTRICTED`}
            className='restricted-data'
          >
            <RestrictedAccessIcon />
            {translations.detailsPage.restrictedData}
          </Link>
        )}
        {isNonPublicData && (
          <Link
            to={`${rootPaths[entity]}?accessrights=NON_PUBLIC`}
            className='non-public-data'
          >
            <NonPublicAccessIcon />
            {translations.detailsPage.nonPublicData}
          </Link>
        )}
        {themes.map(theme => {
          if (isLosTheme(theme)) {
            const { uri, name, losPaths: [losPath] = [] } = theme;
            return (
              <Link key={uri} to={`${rootPaths[entity]}?losTheme=${losPath}`}>
                {translate(name)}
              </Link>
            );
          }

          if (isEuTheme(theme)) {
            const { id, title, code } = theme;
            return (
              <Link key={id} to={`${rootPaths[entity]}?theme=${code}`}>
                {translate(title)}
              </Link>
            );
          }

          return null;
        })}
      </SC.Themes>
      <SC.Page>
        <SC.MenuToggle onClick={() => setNavOpen(!navOpen)}>
          {translations.detailsPage.navMenuButton[navOpen ? 'open' : 'closed']}
        </SC.MenuToggle>
        <SC.SideMenu
          title={translations.detailsPage.menu.title}
          menuItems={menuItems}
        />

        {navOpen && <SC.SideMenuSmall title='' menuItems={menuItems} />}

        <SC.Content>{renderContentSections()}</SC.Content>
      </SC.Page>
    </SC.DetailsPage>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withAssessment,
  withReferenceData
)(DetailsPage);
