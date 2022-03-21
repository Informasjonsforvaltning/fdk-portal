import React, {
  Children,
  FC,
  isValidElement,
  memo,
  PropsWithChildren,
  useEffect,
  useState
} from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FdkLink from '@fellesdatakatalog/link';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_DATASETS,
  PATHNAME_EVENTS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES
} from '../../../../constants/constants';

import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../with-reference-data';
import withAssessment, {
  Props as AssessmentProps
} from '../../../with-assessment';

import Banner from '../banner';
import ContentSection from '../content-section';
import CommunityTopics from '../community-topics';
import EntityComments from '../../../community/comments';

import { isEuTheme, isLosTheme } from '../../../../utils/common';

import OpenAccessIcon from '../../../../images/icon-access-open-md-v2.svg';
import RestrictedAccessIcon from '../../../../images/icon-access-restricted-md-v2.svg';
import NotOpenAccessIcon from '../../../../images/icon-access-not-open-md-v2.svg';

import SC from './styled';

import { Language, Publisher, TextLanguage, Theme } from '../../../../types';
import { Entity } from '../../../../types/enums';

import {
  calculateRatingPercentage,
  determineRatingIcon
} from '../../../../pages/organizations/pages/dataset-page/index';
import withCommunity, {
  Props as CommunityProps
} from '../../../with-community';

interface ExternalProps {
  entity: Entity;
  title: Partial<TextLanguage>;
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
  languages?: Language[];
}

interface Props
  extends ReferenceDataProps,
    AssessmentProps,
    ExternalProps,
    CommunityProps {}

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
  lastPublished,
  isAuthoritative,
  isOpenData,
  isPublicData,
  isRestrictedData,
  isNonPublicData,
  themes = [],
  languages = [],
  topics,
  referenceData: { los: losThemes, themes: euThemes },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  assessmentActions: { getAssessmentRequested: getAssessment },
  communityActions: { searchTopicsRequested: searchTopics, resetTopics },
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
    if (entityId) {
      searchTopics(entityId);
      if (entityId !== assessment?.id) {
        getAssessment(entityId);
      }
    }
    return () => {
      resetTopics();
    };
  }, [entityId]);

  const [navOpen, setNavOpen] = useState(false);

  const communitySection = (
    <ContentSection id='community_section' title={translations.community.title}>
      <CommunityTopics entityType={entity} topics={topics} />
    </ContentSection>
  );

  const commentSection = (
    <ContentSection
      id='comment-section'
      title={
        translations.formatString(
          translations.community.comments.sectionTitle,
          {
            entityType: translations.community.comments.entityTypes[entity]
          }
        ) as string
      }
    >
      <EntityComments entityId={entityId ?? ''} />
    </ContentSection>
  );

  const contentSections = Children.toArray(children).concat([
    communitySection,
    commentSection
  ]);

  const renderContentSections = () =>
    contentSections
      .map(child =>
        isValidElement(child) && child.type === ContentSection ? child : null
      )
      ?.filter(Boolean);

  const menuItems = contentSections
    .filter(
      child =>
        isValidElement(child) &&
        child.type === ContentSection &&
        child.props.id &&
        child.props.title
    )
    .map((child: any) => ({
      id: child.props.id,
      title: translate(child.props.title) ?? child.props.title
    }));

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
        languages={languages}
      />
      <SC.SubBanner>
        {publisher?.id && (
          <>
            <SC.PublisherLink href={`/organizations/${publisher.id}`}>
              {translations.formatString(publisherLabel[entity], {
                publisher: publisherName ?? publisher.id
              })}
            </SC.PublisherLink>
            {assessment && (
              <FdkLink
                href={`/organizations/${publisher.id}/datasets/${entityId}`}
              >
                <SC.MetadataQuality>
                  <p>{translations.metadataQualityPage.metadataQuality}: </p>
                  <SC.RatingIcon>
                    {determineRatingIcon(assessment.rating)}
                  </SC.RatingIcon>
                  <p>{calculateRatingPercentage(assessment.rating)} %</p>
                </SC.MetadataQuality>
              </FdkLink>
            )}
          </>
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
            <OpenAccessIcon />
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
            <NotOpenAccessIcon />
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
            const { id, title: themeTitle, code } = theme;
            return (
              <Link key={id} to={`${rootPaths[entity]}?theme=${code}`}>
                {translate(themeTitle)}
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
  withReferenceData,
  withCommunity
)(DetailsPage);
