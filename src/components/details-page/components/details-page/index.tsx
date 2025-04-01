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
import withDatasetScores, {
  Props as DatasetScoresProps
} from '../../../with-dataset-scores';

import Banner from '../banner';
import ContentSection from '../content-section';
import CommunityTopics from '../community-topics';
import EntityComments from '../../../community/comments';

import OpenAccessIcon from '../../../../images/icon-access-open-md-v2.svg';
import RestrictedAccessIcon from '../../../../images/icon-access-restricted-md-v2.svg';
import NotOpenAccessIcon from '../../../../images/icon-access-not-open-md-v2.svg';

import SC from './styled';

import { Language, Organization, TextLanguage } from '../../../../types';
import { Entity } from '../../../../types/enums';

import { calculateRatingPercentage } from '../../../../pages/organizations/pages/datasets-page';
import withCommunity, {
  Props as CommunityProps
} from '../../../with-community';
import Aside from '../aside';
import { accessRequestWhiteList } from '../../../../white-list';
import { AccessRequestButton } from './accessRequestButton';

interface ExternalProps {
  entity: Entity;
  title: Partial<TextLanguage>;
  publisher?: Partial<Organization>;
  entityId?: string;
  entityUri?: string;
  lastPublished: string;
  isAuthoritative: boolean;
  isOpenData: boolean;
  isPublicData: boolean;
  isRestrictedData: boolean;
  isNonPublicData: boolean;
  languages?: Language[];
}

interface Props
  extends ReferenceDataProps,
    DatasetScoresProps,
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
  datasetScores,
  entityId,
  entityUri,
  lastPublished,
  isAuthoritative,
  isOpenData,
  isPublicData,
  isRestrictedData,
  isNonPublicData,
  languages = [],
  topics,
  multiplePages,
  datasetScoresActions: {
    getDatasetScoresRequested: getDatasetScores,
    resetDatasetScores
  },
  communityActions: { searchTopicsRequested: searchTopics, resetTopics },
  children
}) => {
  const [isSticky, setSticky] = useState(false);

  const accessRequest = accessRequestWhiteList.find(
    item => item.id === entityId
  );

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    currentScrollPos > 500 ? setSticky(true) : setSticky(false);
  };

  function debounce(fn: any, delay: any) {
    return function deb() {
      clearTimeout(fn._tId);
      fn._tId = setTimeout(() => {
        fn();
      }, delay);
    };
  }

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 50));
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [debounce, handleScroll]);

  useEffect(() => {
    if (entityId) {
      searchTopics(entityId);

      const datasetScore = datasetScores
        ? Object.values(datasetScores.scores)[0]
        : null;
      if (
        entity === Entity.DATASET &&
        entityUri &&
        entityId !== datasetScore?.dataset.id
      ) {
        getDatasetScores({ datasets: [entityUri] });
      }
    }
    return () => {
      resetTopics();
      resetDatasetScores();
    };
  }, [entityId]);

  const [navOpen, setNavOpen] = useState(false);

  const communitySection = (
    <ContentSection id='community_section' title={translations.community.title}>
      <CommunityTopics
        entityType={entity}
        topics={topics}
        fdkId={entityId}
        multiplePages={multiplePages}
      />
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
      boxStyle={false}
    >
      <EntityComments entityId={entityId ?? ''} />
    </ContentSection>
  );

  const publishingDate = (
    <SC.PublishingDate>
      {translations.formatString(
        translations.detailsPage.banner.lastPublishedInfo,
        {
          lastPublished
        }
      )}
    </SC.PublishingDate>
  );

  const contentSections = Children.toArray(children).concat([
    communitySection,
    publishingDate,
    commentSection
  ]);

  const renderContentSections = () =>
    contentSections
      .map(child => (isValidElement(child) ? child : null))
      ?.filter(Boolean);

  const renderAside = () =>
    contentSections
      .map(child =>
        isValidElement(child) && child.type === Aside ? child : null
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

  const datasetScore = datasetScores
    ? Object.values(datasetScores.scores)[0]
    : null;

  const renderThemeItems = () => {
    const items = [];
    if (isOpenData) {
      items.push(
        <SC.ThemeItem>
          <Link to={`${rootPaths[entity]}?opendata=true`} className='open-data'>
            <OpenAccessIcon />
            {translations.detailsPage.openData}
          </Link>
        </SC.ThemeItem>
      );
    }

    if (isPublicData) {
      items.push(
        <SC.ThemeItem>
          <Link
            to={`${rootPaths[entity]}?accessrights=PUBLIC`}
            className='public-data'
          >
            <OpenAccessIcon />
            {translations.detailsPage.publicData}
          </Link>
        </SC.ThemeItem>
      );
    }

    if (isRestrictedData) {
      items.push(
        <SC.ThemeItem>
          <Link
            to={`${rootPaths[entity]}?accessrights=RESTRICTED`}
            className='restricted-data'
          >
            <RestrictedAccessIcon />
            {translations.detailsPage.restrictedData}
          </Link>
        </SC.ThemeItem>
      );
    }

    if (isNonPublicData) {
      items.push(
        <SC.ThemeItem>
          <Link
            to={`${rootPaths[entity]}?accessrights=NON_PUBLIC`}
            className='non-public-data'
          >
            <NotOpenAccessIcon />
            {translations.detailsPage.nonPublicData}
          </Link>
        </SC.ThemeItem>
      );
    }
    return items.filter(Boolean);
  };

  return (
    <SC.DetailsPage className='container' id='content'>
      <SC.Heading>
        <Banner
          entity={entity}
          title={title}
          isAuthoritative={isAuthoritative}
          languages={languages}
          publisher={publisher}
        />
        <SC.HeadingLeft>
          {publisher?.id && datasetScore && (
            <SC.SubBanner>
              <FdkLink
                href={`/organizations/${publisher.id}/datasets/${entityId}`}
              >
                <SC.MetadataQuality>
                  <p>
                    {`${
                      translations.metadataQualityPage.metadataQuality
                    }: ${calculateRatingPercentage(datasetScore.dataset)} %`}
                  </p>
                </SC.MetadataQuality>
              </FdkLink>
            </SC.SubBanner>
          )}
          {renderThemeItems().length > 0 && (
            <SC.Themes>{renderThemeItems()}</SC.Themes>
          )}
          <AccessRequestButton
            accessRequest={accessRequest}
            entityId={entityId}
            entity={entity}
          />
        </SC.HeadingLeft>
      </SC.Heading>
      <SC.Page>
        <SC.MenuToggle onClick={() => setNavOpen(!navOpen)}>
          <SC.HamburgerIcon />
          {translations.detailsPage.navMenuButton[navOpen ? 'open' : 'closed']}
        </SC.MenuToggle>
        {entity !== Entity.CONCEPT && (
          <>
            <SC.SideMenu isSticky={isSticky} menuItems={menuItems} />
            {navOpen && <SC.SideMenuSmall menuItems={menuItems} />}
          </>
        )}
        <SC.Content>{renderContentSections()}</SC.Content>
        {renderAside()}
      </SC.Page>
    </SC.DetailsPage>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withDatasetScores,
  withReferenceData,
  withCommunity
)(DetailsPage);
