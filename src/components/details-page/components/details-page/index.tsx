import React, {
  memo,
  FC,
  PropsWithChildren,
  useEffect,
  Children,
  isValidElement
} from 'react';
import { Link } from 'react-router-dom';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../with-reference-data';

import Banner from '../banner';
import ContentSection from '../content-section';

import OpenAccessIcon from '../../../../images/icon-access-open-md.svg';

import SC from './styled';

import { LosTheme, EuTheme } from '../../../../types';
import { Entity } from '../../../../types/enums';

interface Theme {
  id: string;
}

interface EnrichedTheme extends Partial<LosTheme>, Partial<EuTheme> {}

interface Props extends ReferenceDataProps {
  entity: Entity;
  title: string;
  publisher: string;
  lastPublished: string;
  isAuthoritative: boolean;
  isOpenData: boolean;
  themes: Theme[];
}

const rootPaths = {
  [Entity.DATASET]: '',
  [Entity.DATA_SERVICE]: 'apis',
  [Entity.CONCEPT]: 'concepts',
  [Entity.INFORMATION_MODEL]: 'informationmodels'
};

const DetailsPage: FC<PropsWithChildren<Props>> = ({
  entity,
  title,
  publisher,
  lastPublished,
  isAuthoritative,
  isOpenData,
  themes = [],
  referenceData: { los: losThemes, themes: euThemes },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
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

  const renderContentSections = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === ContentSection ? child : null
    )?.filter(Boolean);

  const menuItems = Children.map(children, child =>
    isValidElement(child) && child.type === ContentSection
      ? { id: child.props.id, title: child.props.title }
      : null
  )?.filter(Boolean);

  const themeIds = themes.map(({ id }) => id).filter(Boolean);
  const enrichedThemes: EnrichedTheme[] = [
    ...(losThemes?.filter(({ uri }) => themeIds.includes(uri)) ?? []),
    ...(euThemes?.filter(({ id }) => themeIds.includes(id)) ?? [])
  ];

  const isEuTheme = ({ id, title, code }: EnrichedTheme) =>
    !!id && !!title && !!code;
  const isLosTheme = ({ uri, name, losPaths }: EnrichedTheme) =>
    !!uri && !!name && !!losPaths;

  return (
    <SC.DetailsPage className="container">
      <Banner
        entity={entity}
        title={title}
        lastPublished={lastPublished}
        isAuthoritative={isAuthoritative}
      />
      <SC.Publisher>
        {translations.formatString(translations.detailsPage.publisher, {
          publisher
        })}
      </SC.Publisher>
      <SC.Themes>
        {isOpenData && (
          <Link
            to={`/${rootPaths[entity]}?opendata=true`}
            className="open-data"
          >
            <OpenAccessIcon />
            {translations.detailsPage.openData}
          </Link>
        )}
        {enrichedThemes.map(theme => {
          if (isEuTheme(theme)) {
            const { id, title, code } = theme;
            return (
              <Link key={id} to={`/${rootPaths[entity]}?theme=${code}`}>
                {translate(title)}
              </Link>
            );
          }
          if (isLosTheme(theme)) {
            const { uri, name, losPaths: [losPath] = [] } = theme;
            return (
              <Link key={uri} to={`/${rootPaths[entity]}?losTheme=${losPath}`}>
                {translate(name)}
              </Link>
            );
          }
          return null;
        })}
      </SC.Themes>
      <SC.Page>
        <SC.SideMenu menuItems={menuItems} />
        <SC.Content>{renderContentSections()}</SC.Content>
      </SC.Page>
    </SC.DetailsPage>
  );
};

export default memo(withReferenceData(DetailsPage));
