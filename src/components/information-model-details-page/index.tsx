import React, { memo, FC, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Alignment } from '@fellesdatakatalog/theme';
import { Tab, Pane } from '@fellesdatakatalog/tabs';

import translations from '../../lib/localization';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';

import { PATHNAME_INFORMATIONMODELS } from '../../constants/constants';

import { themeFDK } from '../../app/theme';

import withInformationModel, {
  Props as InformationModelProps
} from '../with-information-model';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../with-reference-data';

import DetailsPage, {
  ContentSection,
  InlineList,
  KeyValueList,
  KeyValueListItem
} from '../details-page';

import { Structure } from '../structure/structure.component';
import { InfoModelStructure } from '../infomodel-structure/infomodel-structure.component';

import SC from './styled';

import type { Theme } from '../../types';
import { Entity, DataFormat } from '../../types/enums';

interface RouteParams {
  informationModelId: string;
}

interface Props
  extends InformationModelProps,
    ReferenceDataProps,
    RouteComponentProps<RouteParams> {}

const InformationModelDetailsPage: FC<Props> = ({
  informationModel,
  informationModelRdfRepresentations,
  referenceData: { linguisticsystem },
  informationModelActions: {
    getInformationModelRequested: getInformationModel,
    getInformationModelRdfRepresentationsRequested: getInformationModelRdfRepresentations,
    resetInformationModel
  },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  match: {
    params: { informationModelId }
  }
}) => {
  const entity = Entity.INFORMATION_MODEL;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  useEffect(() => {
    if (!informationModel || informationModel.id !== informationModelId) {
      getInformationModel(informationModelId);
      getInformationModelRdfRepresentations(informationModelId, [
        DataFormat.TURTLE,
        DataFormat.JSONLD,
        DataFormat.RDF_XML
      ]);
    }

    if (!linguisticsystem) {
      getReferenceData('linguisticsystem');
    }

    return () => {
      resetInformationModel();
    };
  }, []);

  const entityId = informationModel?.id;
  const entityUri = informationModel?.id;
  const identifier = informationModel?.identifier;
  const publisher = informationModel?.publisher;
  const title = translate(informationModel?.title);
  const description = translate(
    informationModel?.description ?? informationModel?.modelDescription
  );
  const status = informationModel?.status;
  const issued = formatDate(dateStringToDate(informationModel?.issued));
  const modified = formatDate(dateStringToDate(informationModel?.modified));
  const version = informationModel?.version;
  const validFromIncluding = formatDate(
    dateStringToDate(informationModel?.validFromIncluding)
  );
  const validToIncluding = formatDate(
    dateStringToDate(informationModel?.validToIncluding)
  );
  const landingPage = informationModel?.landingPage;
  const languages = informationModel?.languages ?? [];
  const keywords =
    informationModel?.keywords?.[
      translations.getLanguage() as 'nb' | 'nn' | 'no' | 'en'
    ]?.filter(Boolean) ?? [];
  const lastPublished = formatDate(
    dateStringToDate(informationModel?.harvest?.firstHarvested)
  );
  const informationModelCategory = informationModel?.category;
  const isNewInformationModel =
    informationModel?.objectTypes ||
    informationModel?.codeTypes ||
    informationModel?.dataTypes ||
    informationModel?.simpleTypes;
  const hasInformationModel = informationModel?.schema || isNewInformationModel;
  const contactPoint = informationModel?.contactPoint;
  const themes: Theme[] =
    informationModel?.themes?.map(({ uri: id }) => ({ id })) ?? [];
  const schema = informationModel?.schema
    ? JSON.parse(informationModel.schema)
    : null;

  return (
    <ThemeProvider theme={theme}>
      <DetailsPage
        entity={entity}
        title={title}
        publisher={publisher}
        entityId={entityId}
        entityUri={entityUri}
        lastPublished={lastPublished}
        isAuthoritative={false}
        isOpenData={false}
        isPublicData={false}
        isRestrictedData={false}
        isNonPublicData={false}
        themes={themes}
      >
        {description && (
          <ContentSection
            id="description"
            title={
              translations.detailsPage.sectionTitles.informationModel
                .description
            }
          >
            {description}
          </ContentSection>
        )}
        {(status ||
          issued ||
          modified ||
          version ||
          validFromIncluding ||
          validToIncluding) && (
          <ContentSection
            id="status"
            title={
              translations.detailsPage.sectionTitles.informationModel.status
            }
          >
            <KeyValueList>
              {status && (
                <KeyValueListItem
                  property={translations.infoMod.status}
                  value={status}
                />
              )}
              {issued && (
                <KeyValueListItem
                  property={translations.infoMod.issued}
                  value={issued}
                />
              )}
              {modified && (
                <KeyValueListItem
                  property={translations.infoMod.lastModified}
                  value={modified}
                />
              )}
              {version && (
                <KeyValueListItem
                  property={translations.infoMod.version}
                  value={version}
                />
              )}
              {(validFromIncluding || validToIncluding) && (
                <KeyValueListItem
                  property={translations.infoMod.valid}
                  value={`${
                    validFromIncluding
                      ? `${translations.infoMod.from} ${validFromIncluding} `
                      : ''
                  }${
                    validToIncluding
                      ? `${translations.infoMod.to} ${validToIncluding}`
                      : ''
                  }`}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {(languages.length > 0 || informationModelCategory || landingPage) && (
          <ContentSection
            id="usage"
            title={
              translations.detailsPage.sectionTitles.informationModel.usage
            }
          >
            <KeyValueList>
              {informationModelCategory && (
                <KeyValueListItem
                  property={translations.infoMod.category}
                  value={informationModelCategory}
                />
              )}
              {languages.length > 0 && (
                <KeyValueListItem
                  property={translations.infoMod.language}
                  value={languages
                    .map(language =>
                      translate(
                        linguisticsystem?.find(({ uri }) => uri === language)
                          ?.prefLabel
                      )
                    )
                    .filter(Boolean)
                    .join(', ')}
                />
              )}
              {landingPage && (
                <KeyValueListItem
                  property={translations.infoMod.seeAlso}
                  value={
                    <SC.Link href={landingPage} external>
                      {translations.infoMod.moreInfo}
                    </SC.Link>
                  }
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {hasInformationModel && (
          <ContentSection
            id="information-model"
            title={
              translations.detailsPage.sectionTitles.informationModel
                .informationModel
            }
          >
            <SC.Tabs tabsAlignment={Alignment.LEFT}>
              {(isNewInformationModel ||
                (schema &&
                  typeof schema === 'object' &&
                  !Array.isArray(schema))) && (
                <Tab for="structure-pane" active>
                  <SC.Tab>{translations.infoMod.tabs.structure}</SC.Tab>
                </Tab>
              )}
              {schema && (
                <Tab for="json-pane" active>
                  <SC.Tab>{translations.infoMod.tabs.json}</SC.Tab>
                </Tab>
              )}
              {informationModelRdfRepresentations?.[DataFormat.TURTLE] && (
                <Tab for="turtle-pane">
                  <SC.Tab>{translations.infoMod.tabs.turtle}</SC.Tab>
                </Tab>
              )}
              {informationModelRdfRepresentations?.[DataFormat.JSONLD] && (
                <Tab for="jsonld-pane">
                  <SC.Tab>{translations.infoMod.tabs.jsonld}</SC.Tab>
                </Tab>
              )}
              {informationModelRdfRepresentations?.[DataFormat.RDF_XML] && (
                <Tab for="rdfxml-pane">
                  <SC.Tab>{translations.infoMod.tabs.rdfxml}</SC.Tab>
                </Tab>
              )}
              {((informationModel && isNewInformationModel) ||
                schema?.definitions) && (
                <Pane id="structure-pane">
                  <SC.Pane>
                    {informationModel && isNewInformationModel && (
                      <InfoModelStructure
                        informationModelDocument={informationModel}
                      />
                    )}
                    {schema?.definitions && (
                      <Structure definitions={schema.definitions} />
                    )}
                  </SC.Pane>
                </Pane>
              )}
              {schema && (
                <Pane id="json-pane">
                  <SC.Pane>
                    <SC.Code>{JSON.stringify(schema, null, 2)}</SC.Code>
                  </SC.Pane>
                </Pane>
              )}
              {informationModelRdfRepresentations?.[DataFormat.TURTLE] && (
                <Pane id="turtle-pane">
                  <SC.Pane>
                    <SC.Code>
                      {informationModelRdfRepresentations[DataFormat.TURTLE]}
                    </SC.Code>
                  </SC.Pane>
                </Pane>
              )}
              {informationModelRdfRepresentations?.[DataFormat.JSONLD] && (
                <Pane id="jsonld-pane">
                  <SC.Pane>
                    <SC.Code>
                      {informationModelRdfRepresentations[DataFormat.JSONLD]}
                    </SC.Code>
                  </SC.Pane>
                </Pane>
              )}
              {informationModelRdfRepresentations?.[DataFormat.RDF_XML] && (
                <Pane id="rdfxml-pane">
                  <SC.Pane>
                    <SC.Code>
                      {informationModelRdfRepresentations[DataFormat.RDF_XML]}
                    </SC.Code>
                  </SC.Pane>
                </Pane>
              )}
            </SC.Tabs>
          </ContentSection>
        )}
        {identifier && (
          <ContentSection
            id="identifiers"
            title={
              translations.detailsPage.sectionTitles.informationModel
                .identifiers
            }
          >
            <KeyValueList>
              {identifier && (
                <KeyValueListItem
                  property={translations.infoMod.identifier}
                  value={identifier}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {keywords.length > 0 && (
          <ContentSection
            id="keywords"
            title={
              translations.detailsPage.sectionTitles.informationModel.keywords
            }
          >
            <InlineList>
              {keywords.map((keyword, index) => (
                <Link
                  to={`${PATHNAME_INFORMATIONMODELS}?keywords=${encodeURIComponent(
                    keyword
                  )}`}
                  key={`${keyword}-${index}`}
                >
                  {keyword}
                </Link>
              ))}
            </InlineList>
          </ContentSection>
        )}
        {contactPoint && (
          <ContentSection
            id="contact-information"
            title={
              translations.detailsPage.sectionTitles.informationModel
                .contactInformation
            }
          >
            <KeyValueList>
              {contactPoint.name && (
                <KeyValueListItem
                  property={translations.name}
                  value={translate(contactPoint.name)}
                />
              )}
              {contactPoint.email && (
                <KeyValueListItem
                  property={translations.email}
                  value={
                    <a
                      title={contactPoint.email}
                      href={`mailto:${contactPoint.email}`}
                      rel="noopener noreferrer"
                    >
                      {contactPoint.email}
                    </a>
                  }
                />
              )}
              {contactPoint.phone && (
                <KeyValueListItem
                  property={translations.phone}
                  value={contactPoint.phone}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
      </DetailsPage>
    </ThemeProvider>
  );
};

export default compose<FC>(
  memo,
  withInformationModel,
  withReferenceData
)(InformationModelDetailsPage);
