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
import type {
  Language,
  PublicServiceLanguage,
  Organization,
  TextLanguage
} from '../../../../types';
import { getTranslateText as translate } from '../../../../lib/translateText';
import MultiLingualField from '../../../multilingual-field/components/multilingual-field';
import LanguageIndicator from '../../../language-indicator';

interface Props {
  entity: Entity;
  title: Partial<TextLanguage>;
  isAuthoritative: boolean;
  languages?: Language[];
  publisher?: Partial<Organization>;
  admsStatus?: PublicServiceLanguage;
}

const Banner: FC<Props> = ({
  entity,
  title,
  publisher,
  admsStatus,
  isAuthoritative,
  languages = []
}) => {
  const entityDetails = {
    [Entity.DATASET]: {
      icon: DatasetIcon,
      translation: translations.detailsPage.relationList.subtitle.dataset
    },
    [Entity.DATA_SERVICE]: {
      icon: ApiIcon,
      translation: translations.detailsPage.relationList.subtitle.dataservice
    },
    [Entity.CONCEPT]: {
      icon: ConceptIcon,
      translation: translations.detailsPage.relationList.subtitle.concept
    },
    [Entity.INFORMATION_MODEL]: {
      icon: InformationModelIcon,
      translation:
        translations.detailsPage.relationList.subtitle.informationmodel
    },
    [Entity.PUBLIC_SERVICE]: {
      icon: PublicServiceIcon,
      translation: translations.detailsPage.relationList.subtitle.public_service
    },
    [Entity.EVENT]: {
      icon: PublicServiceIcon,
      translation: translations.detailsPage.relationList.subtitle.event
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
    <SC.Banner inverted={entity === Entity.EVENT}>
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
        <SC.BannerInfo>
          {admsStatus && (
            <>
              <SC.Dot>•</SC.Dot>
              <SC.Status>{translate(admsStatus.prefLabel)}</SC.Status>
            </>
          )}
        </SC.BannerInfo>
      </SC.Content>
    </SC.Banner>
  );
};

export default memo(Banner);
