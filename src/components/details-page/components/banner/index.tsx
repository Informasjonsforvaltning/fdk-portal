import React, { FC, memo } from 'react';

import translations from '../../../../lib/localization';

import DatasetIcon from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIcon from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIcon from '../../../../images/icon-catalog-concept-lg.svg';
import InformationModelIcon from '../../../../images/icon-catalog-infomod-lg.svg';
import PublicServiceIcon from '../../../../images/icon-catalog-service-lg.svg';
import AuthoritativeIcon from '../../../../images/icon-authoritative-md.svg';

import SC from './styled';

import { Entity } from '../../../../types/enums';
import ReactTooltipSC from '../../../tooltip/styled';
import { Language, Publisher, TextLanguage } from '../../../../types';
import { getTranslateText as translate } from '../../../../lib/translateText';
import MultiLingualField from '../../../multilingual-field/components/multilingual-field';
import LanguageIndicator from '../../../language-indicator';

interface Props {
  entity: Entity;
  title: Partial<TextLanguage>;
  lastPublished: string;
  isAuthoritative: boolean;
  languages?: Language[];
  publisher?: Partial<Publisher>;
}

const Banner: FC<Props> = ({
  entity,
  title,
  lastPublished,
  publisher,
  isAuthoritative,
  languages = []
}) => {
  const entityDetails = {
    [Entity.DATASET]: {
      icon: DatasetIcon,
      translation: translations.detailsPage.banner.entity.dataset
    },
    [Entity.DATA_SERVICE]: {
      icon: ApiIcon,
      translation: translations.detailsPage.banner.entity.dataservice
    },
    [Entity.CONCEPT]: {
      icon: ConceptIcon,
      translation: translations.detailsPage.banner.entity.concept
    },
    [Entity.INFORMATION_MODEL]: {
      icon: InformationModelIcon,
      translation: translations.detailsPage.banner.entity.infomod
    },
    [Entity.PUBLIC_SERVICE]: {
      icon: PublicServiceIcon,
      translation: translations.detailsPage.banner.entity.publicservice
    },
    [Entity.EVENT]: {
      icon: PublicServiceIcon,
      translation: translations.detailsPage.banner.entity.event
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
  const { icon: Icon, translation } = entityDetails[entity];

  return (
    <SC.Banner inverted={entity === Entity.EVENT}>
      {entity === Entity.PUBLIC_SERVICE ||
        (entity === Entity.EVENT && (
          <SC.BetaRibbon inverted>
            {translations.dataset.sample.sampleData}
          </SC.BetaRibbon>
        ))}
      <Icon />
      <SC.Content>
        <SC.TitleWrapper>
          {entity === Entity.CONCEPT && (
            <LanguageIndicator
              textLanguage={title}
              selectedLanguage={translations.getLanguage()}
              whiteBackground
            />
          )}
          <SC.Title>
            {translate(
              title,
              languages.filter(({ selected }) => selected)?.length === 1
                ? languages.filter(({ selected }) => selected).shift()?.code
                : undefined
            )}
            {isAuthoritative && (
              <div data-tip={translations.authoritativeDatasetTooltip}>
                <AuthoritativeIcon />
                <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
              </div>
            )}
          </SC.Title>
        </SC.TitleWrapper>
        {entity === Entity.CONCEPT &&
          languages.filter(({ selected }) => selected)?.length > 1 && (
            <MultiLingualField
              languages={languages}
              text={title}
              skippedLanguages={[translations.getLanguage()]}
              iconAlignCenter
              useFallback={false}
            />
          )}
        <SC.LastPublishedInfo>
          {translations.formatString(
            translations.detailsPage.banner.lastPublishedInfo,
            {
              entity: translation,
              lastPublished
            }
          )}
        </SC.LastPublishedInfo>
        {publisher?.id && (
          <SC.PublisherLink href={`/organizations/${publisher.id}`}>
            {translations.formatString(publisherLabel[entity], {
              publisher: publisherName ?? publisher.id
            })}
          </SC.PublisherLink>
        )}
      </SC.Content>
    </SC.Banner>
  );
};

export default memo(Banner);
