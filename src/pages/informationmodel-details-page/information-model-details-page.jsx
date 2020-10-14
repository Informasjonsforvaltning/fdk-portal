import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router-dom';

import localization from '../../lib/localization';
import { formatDate, dateStringToDate } from '../../lib/date-utils';
import { getTranslateText } from '../../lib/translateText';
import { HarvestDate } from '../../components/harvest-date/harvest-date.component';
import { SearchHitHeader } from '../../components/search-hit-header/search-hit-header.component';
import { StickyMenu } from '../../components/sticky-menu/sticky-menu.component';
import { TwoColRow } from '../../components/list-regular/twoColRow/twoColRow';
import { ListRegular } from '../../components/list-regular/list-regular.component';
import { LinkExternal } from '../../components/link-external/link-external.component';
import { ShowMore } from '../../components/show-more/show-more';
import { Tabs } from '../../components/tabs/tabs.component';
import { Structure } from './structure/structure.component';
import './information-model-details-page.scss';
import { InfoModelStructure } from './infomodel-structure/infomodel-structure.component';

const renderJSONSchema = schema =>
  schema && (
    <div>
      <pre className="code">{JSON.stringify(schema, null, 2)}</pre>
    </div>
  );

const renderRdfData = rdfData =>
  rdfData && <pre className="code">{rdfData}</pre>;

const getSchema = model => {
  const schemaJson = _.get(model, 'schema', null);
  return JSON.parse(schemaJson);
};

const isNewInformationModel = ({
  objectTypes,
  codeTypes,
  dataTypes,
  simpleTypes
} = {}) => objectTypes || codeTypes || dataTypes || simpleTypes;

const createTabsArray = (informationModelItem, rdfData) => {
  const tabsArray = [];

  if (isNewInformationModel(informationModelItem)) {
    tabsArray.push({
      title: localization.infoMod.tabs.structure,
      body: (
        <InfoModelStructure informationModelDocument={informationModelItem} />
      )
    });
  }

  const parsedJsonSchema = getSchema(informationModelItem);
  // only show structure-tab if schema is an object, not when schema is an array
  if (parsedJsonSchema && parsedJsonSchema.definitions) {
    tabsArray.push({
      title: localization.infoMod.tabs.structure,
      body: <Structure definitions={parsedJsonSchema.definitions} />
    });
  }
  if (parsedJsonSchema) {
    tabsArray.push({
      title: localization.infoMod.tabs.json,
      body: renderJSONSchema(parsedJsonSchema)
    });
  }
  if (rdfData) {
    tabsArray.push(
      {
        title: localization.infoMod.tabs.turtle,
        body: renderRdfData(rdfData.turtle)
      },
      {
        title: localization.infoMod.tabs.jsonld,
        body: renderJSONSchema(rdfData.jsonld)
      },
      {
        title: localization.infoMod.tabs.rdfxml,
        body: renderRdfData(rdfData.rdfxml)
      }
    );
  }

  return tabsArray;
};

const renderModels = (informationModelItem, rdfData) => {
  if (!informationModelItem) {
    return null;
  }

  return (
    <ListRegular title={localization.infoMod.infoModHeader}>
      <div className="d-flex list-regular--item" />
      <Tabs tabContent={createTabsArray(informationModelItem, rdfData)} />
    </ListRegular>
  );
};

const renderDescription = description =>
  description ? (
    <ShowMore showMoreButtonText={localization.showFullDescription}>
      {getTranslateText(description)}
    </ShowMore>
  ) : null;

const renderStatus = ({
  version,
  issued,
  modified,
  status,
  languages,
  validFromIncluding,
  validToIncluding,
  changelog,
  landingPage
}) =>
  (issued ||
    validFromIncluding ||
    validToIncluding ||
    version ||
    modified ||
    changelog ||
    landingPage) && (
    <ListRegular title={localization.infoMod.status}>
      {status && (
        <TwoColRow col1={localization.infoMod.modelStatus} col2={status} />
      )}
      {languages.length > 0 && (
        <TwoColRow
          col1={localization.infoMod.language}
          col2={languages.join(', ')}
        />
      )}
      {issued && (
        <TwoColRow
          col1={localization.infoMod.issued}
          col2={formatDate(dateStringToDate(issued))}
        />
      )}
      {(validFromIncluding || validToIncluding) && (
        <TwoColRow
          col1={localization.infoMod.valid}
          col2={`${validFromIncluding ? localization.infoMod.from : ''} ${
            validFromIncluding
              ? formatDate(dateStringToDate(validFromIncluding))
              : ''
          } ${validToIncluding ? localization.infoMod.to : ''} ${
            validToIncluding
              ? formatDate(dateStringToDate(validToIncluding))
              : ''
          }`}
        />
      )}
      {version && (
        <TwoColRow col1={localization.infoMod.version} col2={version} />
      )}
      {modified && (
        <TwoColRow
          col1={localization.infoMod.lastModified}
          col2={formatDate(dateStringToDate(modified))}
        />
      )}
      {changelog && (
        <TwoColRow col1={localization.infoMod.changelog} col2={changelog} />
      )}
      {landingPage && (
        <div className="d-flex list-regular--item">
          <LinkExternal
            uri={landingPage}
            prefLabel={localization.infoMod.moreInfo}
            openInNewTab
          />
        </div>
      )}
    </ListRegular>
  );

const renderIdentifier = id =>
  id ? (
    <ListRegular title={localization.infoMod.identifier}>
      <div className="d-flex list-regular--item">
        <a
          href={`/api/informationmodels/${id}`}
        >{`${location.origin}/api/informationmodels/${id}`}</a>
      </div>
    </ListRegular>
  ) : null;

const hasKeywords = keywords =>
  keywords &&
  localization.getLanguage() in keywords &&
  keywords[localization.getLanguage()].length > 0;

const renderKeywords = keywords => {
  const language = localization.getLanguage();
  return hasKeywords(keywords) ? (
    <ListRegular title={localization.infoMod.keywords}>
      <div className="d-flex list-regular--item">
        {(keywords[language] || []).map((keyword, index) => (
          <Fragment key={keyword}>
            {index > 0 && <>,&nbsp;</>}
            <Link
              to={`/informationmodels?keywords=${encodeURIComponent(keyword)}`}
            >
              {keyword}
            </Link>
          </Fragment>
        ))}
      </div>
    </ListRegular>
  ) : null;
};

const renderInformationModelCategory = category =>
  category ? (
    <ListRegular title={localization.infoMod.category}>
      <div className="d-flex list-regular--item">{category}</div>
    </ListRegular>
  ) : null;

const renderRelatedApi = (referencedApis, publisherItems) => {
  if (!referencedApis || referencedApis.length === 0) {
    return null;
  }
  const apiReferenceItems = items =>
    items.map((item, index) => (
      <div key={`reference-${index}`} className="list-regular--item">
        <SearchHitHeader
          title={item.title}
          titleLink={`/dataservices/${encodeURIComponent(item.id)}`}
          publisherLabel={`${localization.responsible}:`}
          publisher={item.publisher}
          publisherItems={publisherItems}
          tag="h4"
          darkThemeBackground
        />
      </div>
    ));

  return (
    <ListRegular title={localization.infoMod.relatedAPIHeader}>
      {apiReferenceItems(referencedApis)}
    </ListRegular>
  );
};

const renderContactPoint = ({ name, email, phone } = {}) =>
  name || email || phone ? (
    <ListRegular title={localization.contactInfo}>
      {name && (
        <TwoColRow
          col1={localization.contactPoint}
          col2={getTranslateText(name)}
        />
      )}
      {email && (
        <TwoColRow
          col1={localization.email}
          col2={
            <a title={email} href={`mailto:${email}`} rel="noopener noreferrer">
              {email}
            </a>
          }
        />
      )}
      {phone && <TwoColRow col1={localization.phone} col2={phone} />}
    </ListRegular>
  ) : null;

const renderStickyMenu = (
  {
    title,
    contactPoint,
    schema,
    keywords,
    category,
    objectTypes,
    codeTypes,
    dataTypes,
    simpleTypes
  } = {},
  referencedApis
) => {
  const menuItems = [
    {
      name: getTranslateText(title),
      prefLabel: localization.description
    },
    {
      name: localization.infoMod.status,
      prefLabel: localization.infoMod.status
    },
    {
      name: localization.infoMod.identifier,
      prefLabel: localization.infoMod.identifier
    }
  ];

  if (
    schema ||
    isNewInformationModel({ objectTypes, codeTypes, dataTypes, simpleTypes })
  ) {
    menuItems.push({
      name: localization.infoMod.infoModHeader,
      prefLabel: localization.infoMod.infoModHeader
    });
  }

  if (hasKeywords(keywords)) {
    menuItems.push({
      name: localization.infoMod.keywords,
      prefLabel: localization.infoMod.keywords
    });
  }

  if (category) {
    menuItems.push({
      name: localization.infoMod.category,
      prefLabel: localization.infoMod.category
    });
  }

  if (!_.isEmpty(referencedApis)) {
    menuItems.push({
      name: localization.infoMod.relatedAPIHeader,
      prefLabel: localization.infoMod.relatedAPIHeader
    });
  }

  if (contactPoint) {
    menuItems.push({
      name: localization.contactInfo,
      prefLabel: localization.contactInfo
    });
  }

  return <StickyMenu title={localization.goTo} menuItems={menuItems} />;
};

export const InformationModelDetailsPage = ({
  fetchPublishersIfNeeded,
  fetchReferenceDataIfNeeded,
  fetchRdfDataIfNeeded,
  informationModelItem,
  publisherItems,
  referencedApis,
  referenceData,
  rdfData
}) => {
  const {
    id,
    title,
    publisher,
    harvest,
    version,
    issued,
    modified,
    status,
    languages: languageUris = [],
    validFromIncluding,
    validToIncluding,
    changelog,
    contactPoint,
    landingPage,
    description,
    themes,
    keywords,
    category,
    schema
  } = informationModelItem || {};

  useEffect(() => {
    fetchPublishersIfNeeded();
    fetchReferenceDataIfNeeded('los');
    fetchReferenceDataIfNeeded('codes/linguisticsystem');
    fetchRdfDataIfNeeded(id);
  }, [id]);

  const meta = {
    title: getTranslateText(informationModelItem.title),
    description: getTranslateText(informationModelItem.description)
  };

  const hasModel = isNewInformationModel(informationModelItem) || schema;
  const languages = (referenceData.items['codes/linguisticsystem'] || [])
    .filter(({ uri }) => languageUris.includes(uri))
    .map(({ prefLabel }) => getTranslateText(prefLabel))
    .filter(Boolean);

  return (
    <main id="content" className="container">
      <article>
        <div className="row">
          <div className="col-12 col-lg-9 offset-lg-3">
            <DocumentMeta {...meta} />

            <div className="d-flex align-items-center fdk-detail-date mb-5">
              <i className="align-self-center fdk-icon-catalog-infomodel mr-2" />
              <strong className="align-self-center">
                {localization.infoMod.informationModelDescription}&nbsp;
              </strong>
              <HarvestDate className="align-self-center" harvest={harvest} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-3 ">
            {renderStickyMenu(informationModelItem, referencedApis)}
          </div>

          <section className="col-12 col-lg-9 mt-3">
            <SearchHitHeader
              title={getTranslateText(title)}
              publisherLabel={`${localization.responsible}:`}
              publisher={publisher}
              publisherItems={publisherItems}
              theme={(themes || []).map(({ uri: id }) => ({ id }))}
              referenceData={referenceData}
              darkThemeBackground
            />

            {renderDescription(description)}

            {renderStatus({
              version,
              issued,
              modified,
              status,
              languages,
              validFromIncluding,
              validToIncluding,
              changelog,
              landingPage
            })}

            {renderIdentifier(id)}

            {hasModel && renderModels(informationModelItem, rdfData)}

            {renderKeywords(keywords)}

            {renderInformationModelCategory(category)}

            {renderRelatedApi(referencedApis, publisherItems)}

            {renderContactPoint(contactPoint)}
          </section>
        </div>
      </article>
    </main>
  );
};

InformationModelDetailsPage.defaultProps = {
  informationModelItem: null,
  publisherItems: null,
  fetchRdfDataIfNeeded: _.noop,
  fetchPublishersIfNeeded: _.noop,
  fetchReferenceDataIfNeeded: _.noop,
  referencedApis: [],
  referenceData: null
};

InformationModelDetailsPage.propTypes = {
  informationModelItem: PropTypes.object,
  publisherItems: PropTypes.object,
  fetchRdfDataIfNeeded: PropTypes.func,
  fetchPublishersIfNeeded: PropTypes.func,
  fetchReferenceDataIfNeeded: PropTypes.func,
  referencedApis: PropTypes.array,
  referenceData: PropTypes.object
};
