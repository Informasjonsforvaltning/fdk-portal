import React, { FC, memo } from 'react';

import { Divider } from '@digdir/design-system-react';
import translations from '../../../../lib/localization';

import DatasetIcon from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIcon from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIcon from '../../../../images/icon-catalog-concept-lg.svg';
import InformationModelIcon from '../../../../images/icon-catalog-infomod-lg.svg';
import PublicServiceIcon from '../../../../images/icon-catalog-service-lg.svg';
import AuthoritativeIcon from '../../../../images/icon-authoritative-md.svg';

import SC from './styled';

import { Entity, LanguageCodes } from '../../../../types/enums';
import type { Language, Organization, TextLanguage } from '../../../../types';
import { getTranslateText as translate } from '../../../../lib/translateText';

type LanguageType = LanguageCodes.nb | LanguageCodes.nn | LanguageCodes.en;

interface Props {
  entity: Entity;
  title: Partial<TextLanguage>;
  isAuthoritative: boolean;
  languages?: Language[];
  publisher?: Partial<Organization>;
}

const Banner: FC<Props> = ({
  entity,
  title,
  publisher,
  isAuthoritative,
  languages = []
}) => {
  const entityDetails = {
    [Entity.DATASET]: {
      icon: DatasetIcon,
      translation: translations.detailsPage.banner.entity.DATASET
    },
    [Entity.DATA_SERVICE]: {
      icon: ApiIcon,
      translation: translations.detailsPage.banner.entity.DATA_SERVICE
    },
    [Entity.CONCEPT]: {
      icon: ConceptIcon,
      translation: translations.detailsPage.banner.entity.CONCEPT
    },
    [Entity.INFORMATION_MODEL]: {
      icon: InformationModelIcon,
      translation: translations.detailsPage.banner.entity.INFORMATION_MODEL
    },
    [Entity.PUBLIC_SERVICE]: {
      icon: PublicServiceIcon,
      translation: translations.detailsPage.banner.entity.SERVICE
    },
    [Entity.EVENT]: {
      icon: PublicServiceIcon,
      translation: translations.detailsPage.banner.entity.EVENT
    }
  };

  const publisherLabel = {
    [Entity.DATASET]: translations.detailsPage.owner,
    [Entity.DATA_SERVICE]: translations.detailsPage.provider,
    [Entity.CONCEPT]: translations.detailsPage.responsible,
    [Entity.INFORMATION_MODEL]: translations.detailsPage.responsible,
    [Entity.PUBLIC_SERVICE]: translations.detailsPage.provider,
    [Entity.EVENT]: translations.detailsPage.provider
  };

  const publisherName = translate(publisher?.prefLabel || publisher?.name);
  const pubisherId = publisher?.identifier || publisher?.id;
  const { translation } = entityDetails[entity];

  return (
    <>
      <SC.Banner inverted={entity === Entity.EVENT}>
        <SC.Content>
          <SC.TitleWrapper>
            <SC.Title>
              <span>
                {translate(
                  title,
                  languages.filter(({ selected }) => selected)?.length === 1
                    ? languages.filter(({ selected }) => selected).shift()?.code
                    : undefined
                )}
              </span>
              {isAuthoritative && (
                <div title={translations.authoritativeDatasetTooltip}>
                  <AuthoritativeIcon />
                </div>
              )}
            </SC.Title>

            {entity === Entity.CONCEPT &&
              title[translations.getLanguage() as LanguageType] && (
                <SC.TitleLanguage>
                  {`(${translations.shortLang[translations.getLanguage()]})`}
                </SC.TitleLanguage>
              )}
          </SC.TitleWrapper>
          {languages.filter(({ selected }) => selected).length > 1 && (
            <SC.SecondTitlesWrapped>
              {languages
                .filter(
                  ({ code, selected }) =>
                    code !== translations.getLanguage() && selected
                )
                .map(({ code }, index, array) => {
                  const typedCode = code as LanguageType;
                  const titleString = `${translations.shortLang[code]}: ${title[typedCode]}`;
                  const isLast = index === array.length - 1;
                  return (
                    <>
                      <SC.SecondTitles>{titleString}</SC.SecondTitles>
                      {!isLast && <SC.Hyphen> - </SC.Hyphen>}
                    </>
                  );
                })}
            </SC.SecondTitlesWrapped>
          )}

          <SC.BannerInfo>
            <SC.ResourceType>{translation}</SC.ResourceType>
            {pubisherId && (
              <p>
                {`-  ${translations.formatString(publisherLabel[entity], {
                  publisher: publisherName ?? pubisherId
                })}`}
              </p>
            )}
          </SC.BannerInfo>
          <SC.BannerInfo />
        </SC.Content>
      </SC.Banner>
      <Divider color='strong' />
    </>
  );
};

export default memo(Banner);
