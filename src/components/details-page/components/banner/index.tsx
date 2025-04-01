import React, { FC, memo } from 'react';

import translations from '../../../../lib/localization';
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

  return (
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
                  code !== translations.getLanguage() &&
                  selected &&
                  (code as LanguageType) in title &&
                  title[code as LanguageType]
              )
              .map(({ code }, index) => (
                <SC.SecondTitles>
                  {`${index > 0 ? ', ' : ''}${translations.shortLang[code]}: `}
                  <i>{title[code as LanguageType]}</i>
                </SC.SecondTitles>
              ))}
          </SC.SecondTitlesWrapped>
        )}

        <SC.BannerInfo>
          {pubisherId && (
            <>
              <span>{publisherLabel[entity]}</span>
              <SC.PublisherLink href={`/organizations/${pubisherId}`}>
                {publisherName ?? pubisherId}
              </SC.PublisherLink>
            </>
          )}
        </SC.BannerInfo>
        <SC.BannerInfo />
      </SC.Content>
    </SC.Banner>
  );
};

export default memo(Banner);
