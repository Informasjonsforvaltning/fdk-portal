import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import SC from './styled';
import translations from '../../lib/localization';
import {
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_APIS,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_GUIDANCE,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_NEWS_ARCHIVE,
  PATHNAME_REPORTS,
  PATHNAME_SEARCH
} from '../../constants/constants';

const renderPaths = (paths: any) =>
  paths.map(({ title, path, externalLink }: any) => (
    <SC.BoxListLink key={`link-${title}-${path}`}>
      {!externalLink ? (
        <Link to={path}>{title}</Link>
      ) : (
        <a title={title} href={path} rel="noopener noreferrer">
          {title}
        </a>
      )}
    </SC.BoxListLink>
  ));

const Footer: FC = () => {
  const searchCatalogsPaths = [
    {
      title: translations.footer.searchAllCatalogs,
      path: PATHNAME_SEARCH
    },
    {
      title: translations.footer.searchDatasets,
      path: PATHNAME_DATASETS
    },
    {
      title: translations.footer.searchDataservices,
      path: PATHNAME_APIS
    },
    {
      title: translations.footer.searchConcepts,
      path: PATHNAME_CONCEPTS
    },
    {
      title: translations.footer.searchInformationModels,
      path: PATHNAME_INFORMATIONMODELS
    }
  ];

  const aboutFDKPaths = [
    {
      title: translations.footer.guidance,
      path: PATHNAME_GUIDANCE
    },
    {
      title: translations.footer.reports,
      path: PATHNAME_REPORTS
    },
    {
      title: translations.footer.aboutFDK,
      path: PATHNAME_ABOUT
    },
    {
      title: translations.footer.guideToRegister,
      path: PATHNAME_ABOUT_REGISTRATION
    },
    {
      title: translations.footer.news,
      path: PATHNAME_NEWS_ARCHIVE
    }
  ];

  const aboutSitePaths = [
    {
      title: translations.footer.privacyText,
      path: 'https://www.digdir.no/om-oss/personvernerklaering/706',
      externalLink: true
    },
    {
      title: translations.footer.informationCookies,
      path: 'https://www.digdir.no/om-oss/personvernerklaering/706',
      externalLink: true
    }
  ];

  return (
    <SC.Footer>
      <div className="container">
        <SC.FooterContent className="row">
          <SC.Box>
            <SC.BoxHeader>
              {translations.footer.searchCatalogsTitle}
            </SC.BoxHeader>
            <SC.BoxList>{renderPaths(searchCatalogsPaths)}</SC.BoxList>
          </SC.Box>

          <SC.Box>
            <SC.BoxHeader>{translations.footer.aboutFDKTitle}</SC.BoxHeader>
            <SC.BoxList>{renderPaths(aboutFDKPaths)}</SC.BoxList>
          </SC.Box>

          <SC.Box>
            <SC.BoxHeader>{translations.footer.aboutSiteTitle}</SC.BoxHeader>
            <span>{translations.footer.footerText}</span>
            <SC.BoxList>{renderPaths(aboutSitePaths)}</SC.BoxList>
          </SC.Box>

          <SC.Box>
            <SC.BoxHeader>{translations.footer.contactTitle}</SC.BoxHeader>
            <SC.BoxList>
              <SC.BoxListLink>
                <a href={`mailto:${translations.footer.mail}`}>
                  {translations.footer.mail}
                </a>
              </SC.BoxListLink>
              <SC.BoxListLink>
                <a href="https://twitter.com/datakatalogen">
                  {translations.footer.twitter}
                </a>
              </SC.BoxListLink>
            </SC.BoxList>
          </SC.Box>
        </SC.FooterContent>
      </div>
    </SC.Footer>
  );
};

export default Footer;
