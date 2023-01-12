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

import { isEuTheme, isLosTheme } from '../../../../utils/common';

import OpenAccessIcon from '../../../../images/icon-access-open-md-v2.svg';
import RestrictedAccessIcon from '../../../../images/icon-access-restricted-md-v2.svg';
import NotOpenAccessIcon from '../../../../images/icon-access-not-open-md-v2.svg';

import SC from './styled';

import {
  Language,
  PublicServiceLanguage,
  Organization,
  TextLanguage,
  Theme
} from '../../../../types';
import { Entity } from '../../../../types/enums';

import {
  calculateRatingPercentage,
  determineRatingIcon
} from '../../../../pages/organizations/pages/datasets-page/index';
import withCommunity, {
  Props as CommunityProps
} from '../../../with-community';
import Aside from '../aside';

interface ExternalProps {
  entity: Entity;
  title: Partial<TextLanguage>;
  publisher?: Partial<Organization>;
  admsStatus?: PublicServiceLanguage;
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
  admsStatus,
  datasetScores,
  entityId,
  entityUri,
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
  datasetScoresActions: { getDatasetScoresRequested: getDatasetScores },
  communityActions: { searchTopicsRequested: searchTopics, resetTopics },
  children
}) => {
  const [isSticky, setSticky] = useState(false);

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
      boxStyle={false}
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

  return (
    <SC.DetailsPage className='container'>
      <Banner
        entity={entity}
        title={title}
        lastPublished={lastPublished}
        isAuthoritative={isAuthoritative}
        languages={languages}
        publisher={publisher}
        admsStatus={admsStatus}
      />
      <SC.SubBanner>
        {publisher?.id && (
          <>
            {datasetScore && (
              <FdkLink
                href={`/organizations/${publisher.id}/datasets/${entityId}`}
              >
                <SC.MetadataQuality>
                  <p>{translations.metadataQualityPage.metadataQuality}: </p>
                  <SC.RatingIcon>
                    {determineRatingIcon(datasetScore.dataset)}
                  </SC.RatingIcon>
                  <p>{calculateRatingPercentage(datasetScore.dataset)} %</p>
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
            const { id, title: themeTitle, label: themeLabel, code } = theme;
            return (
              <Link key={id} to={`${rootPaths[entity]}?theme=${code}`}>
                {themeTitle ? translate(themeTitle) : translate(themeLabel)}
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
        <SC.SideMenu isSticky={isSticky} menuItems={menuItems} />
        {navOpen && <SC.SideMenuSmall menuItems={menuItems} />}

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
