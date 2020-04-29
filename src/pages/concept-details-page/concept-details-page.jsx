import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';

import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';
import {
  dateStringToDate,
  isDateBeforeToday,
  isDateAfterToday,
  formatDate
} from '../../lib/date-utils';
import { ListRegular } from '../../components/list-regular/list-regular.component';
import { TwoColRow } from '../../components/list-regular/twoColRow/twoColRow';
import { HarvestDate } from '../../components/harvest-date/harvest-date.component';
import { SearchHitHeader } from '../../components/search-hit-header/search-hit-header.component';
import { ShowMore } from '../../components/show-more/show-more';
import { LinkExternal } from '../../components/link-external/link-external.component';
import { StickyMenu } from '../../components/sticky-menu/sticky-menu.component';
import './concept-details-page.scss';

const renderDescription = description => {
  const descriptionText = getTranslateText(description);
  return (
    descriptionText && (
      <ShowMore showMoreButtonText={localization.showFullDescription}>
        {descriptionText}
      </ShowMore>
    )
  );
};

const renderSource = ({ sourceRelationship, sources }) => {
  if (sourceRelationship === 'egendefinert') {
    return (
      <div className="fdk-ingress">
        <span>
          {`${localization.compare.source}: ${localization.sourceRelationship[sourceRelationship]}`}
        </span>
      </div>
    );
  }

  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="fdk-ingress">
      <span>
        {`${localization.compare.source}: ${
          sourceRelationship
            ? localization.sourceRelationship[sourceRelationship]
            : ''
        }`}
      </span>
      {sources.map(({ text, uri }, index) => (
        <Fragment key={`${text}-${uri}`}>
          {index > 0 && ','}
          &nbsp;
          {uri ? (
            <LinkExternal uri={uri} prefLabel={text || uri} openInNewTab />
          ) : (
            getTranslateText(text)
          )}
        </Fragment>
      ))}
    </div>
  );
};

const renderValidity = (validFromIncluding, validToIncluding) => {
  if (validFromIncluding || validToIncluding) {
    const validFromIncludingDate = dateStringToDate(validFromIncluding);
    const validToIncludinggDate = dateStringToDate(validToIncluding);
    return (
      <section className="fdk-validity mb-5">
        <div>
          <h4>{localization.validity.validFromIncluding}</h4>
          <p>
            {validFromIncludingDate ? formatDate(validFromIncludingDate) : '-'}
          </p>
        </div>
        <div>
          <h4>{localization.validity.validToIncluding}</h4>
          <p>
            {validToIncludinggDate ? formatDate(validToIncludinggDate) : '-'}
          </p>
        </div>
      </section>
    );
  }
  return null;
};

const renderRemark = remark => {
  if (!remark) {
    return null;
  }

  return (
    <ListRegular title={localization.concept.remarkHeader}>
      <div className="d-flex list-regular--item">
        {getTranslateText(remark)}
      </div>
    </ListRegular>
  );
};

const renderSubject = subject => {
  if (!subject) {
    return null;
  }
  return (
    <TwoColRow
      col1={localization.concept.subject}
      col2={getTranslateText(subject)}
    />
  );
};

const renderApplication = application => {
  const applicationItems = items =>
    items
      .filter(item => localization.getLanguage() in item)
      .map((item, index) => (
        <span key={index}>
          {index > 0 ? ', ' : ''}
          {getTranslateText(item)}
        </span>
      ));

  if (!application || application.length === 0) {
    return null;
  }
  return (
    <TwoColRow
      col1={localization.concept.application}
      col2={applicationItems(application)}
    />
  );
};

const renderSubjectAndApplication = (subject, application) => {
  if (_.isEmpty(subject) && _.isEmpty(application)) {
    return null;
  }

  return (
    <ListRegular title={localization.concept.subjectHeader}>
      {renderSubject(subject)}
      {renderApplication(application)}
    </ListRegular>
  );
};

const renderTerms = (altLabel, hiddenLabel) => {
  const labels = labelArray =>
    labelArray
      .filter(label => localization.getLanguage() in label)
      .map((item, index) => (
        <span key={`altLabel-${index}`} className="fdk-label-item">
          {getTranslateText(item)}
        </span>
      ));

  const existFieldValue = value =>
    Array.isArray(value) ? value.some(valueItem => !!valueItem) : !!value;

  if (!(existFieldValue(altLabel) || existFieldValue(hiddenLabel))) {
    return false;
  }

  return (
    <ListRegular title={localization.concept.termHeader}>
      {existFieldValue(altLabel) && (
        <TwoColRow
          col1={localization.concept.altLabel}
          col2={labels(altLabel)}
        />
      )}
      {existFieldValue(hiddenLabel) && (
        <TwoColRow
          col1={localization.concept.hiddenLabel}
          col2={labels(hiddenLabel)}
        />
      )}
    </ListRegular>
  );
};

const renderRange = range => {
  if (!range || _.isEmpty(range)) {
    return null;
  }
  return (
    <ListRegular title={localization.concept.range}>
      <div className="d-flex list-regular--item">
        <LinkExternal
          uri={_.get(range, 'uri')}
          prefLabel={_.get(range, 'text') || _.get(range, 'uri')}
        />
      </div>
    </ListRegular>
  );
};

const renderIdentifiers = id => {
  if (!id) {
    return null;
  }

  return (
    <ListRegular title={localization.concept.identifier}>
      <div className="d-flex list-regular--item">
        <a href={`/api/concepts/${id}`}>{`${_.get(
          window.location,
          'origin'
        )}/api/concepts/${id}`}</a>
      </div>
    </ListRegular>
  );
};

const renderDatasets = datasets =>
  datasets &&
  datasets.length > 0 && (
    <ListRegular title={localization.concept.datasetReferences}>
      {datasets.map(({ id, title }) => (
        <li key={id} className="d-flex list-regular--item">
          <a href={`/datasets/${id}`}>{getTranslateText(title)}</a>
        </li>
      ))}
    </ListRegular>
  );

const renderInformationModelReferences = informationModels =>
  informationModels &&
  informationModels.length > 0 && (
    <ListRegular title={localization.concept.informationModelReferences}>
      {informationModels.map(({ id, title }) => (
        <li key={id} className="d-flex list-regular--item">
          <a href={`/informationmodels/${id}`}>{getTranslateText(title)}</a>
        </li>
      ))}
    </ListRegular>
  );

const renderConceptReferences = (
  { prefLabel, seeAlso = [] },
  conceptReferences
) => {
  if (conceptReferences) {
    const seeAlsoReferences = conceptReferences.filter(({ identifier }) =>
      seeAlso.includes(identifier)
    );
    return (
      <ListRegular
        title={`${localization.conceptReferences.title} ${getTranslateText(
          prefLabel
        )}`}
        name={localization.conceptReferences.sideMenuTitle}
      >
        {seeAlsoReferences.map(
          ({
            id,
            prefLabel: seeAlsoConceptPrefLabel,
            validFromIncluding,
            validToIncluding
          }) => {
            const isExpired = isDateBeforeToday(
              dateStringToDate(validToIncluding)
            );
            const isWillBeValid = isDateAfterToday(
              dateStringToDate(validFromIncluding)
            );
            return (
              <li key={id} className="d-flex list-regular--item">
                {localization.conceptReferences.seeAlso}
                &nbsp;
                <a href={`/concepts/${id}`}>
                  {getTranslateText(seeAlsoConceptPrefLabel)}
                  {isExpired && <>&nbsp;({localization.validity.expired})</>}
                  {!isExpired && isWillBeValid && (
                    <>&nbsp;({localization.validity.willBeValid})</>
                  )}
                </a>
              </li>
            );
          }
        )}
      </ListRegular>
    );
  }
  return null;
};

const renderContactPoint = contactPoint => {
  if (!(_.get(contactPoint, 'email') || _.get(contactPoint, 'telephone'))) {
    return null;
  }
  return (
    <ListRegular title={localization.contactInfo}>
      {_.get(contactPoint, 'email') && (
        <TwoColRow
          col1={localization.email}
          col2={
            <a
              title={_.get(contactPoint, 'email')}
              href={`mailto:${_.get(contactPoint, 'email')}`}
              rel="noopener noreferrer"
            >
              {_.get(contactPoint, 'email')}
            </a>
          }
        />
      )}
      {_.get(contactPoint, 'telephone') && (
        <TwoColRow
          col1={localization.phone}
          col2={_.get(contactPoint, 'telephone')}
        />
      )}
    </ListRegular>
  );
};

const renderSample = sample => {
  if (!(sample && getTranslateText(sample))) {
    return null;
  }
  return (
    <ListRegular title={localization.concept.sample}>
      <div className="d-flex list-regular--item">
        {getTranslateText(sample)}
      </div>
    </ListRegular>
  );
};

const renderStickyMenu = conceptItem => {
  const menuItems = [];
  menuItems.push({
    name: getTranslateText(_.get(conceptItem, 'prefLabel')),
    prefLabel: localization.concept.definition
  });
  if (getTranslateText(_.get(conceptItem, 'definition.remark'))) {
    menuItems.push({
      name: localization.concept.remarkHeader,
      prefLabel: localization.concept.remarkHeader
    });
  }
  if (getTranslateText(_.get(conceptItem, 'example'))) {
    menuItems.push({
      name: localization.concept.sample,
      prefLabel: localization.concept.sample
    });
  }
  if (getTranslateText(_.get(conceptItem, 'subject'))) {
    menuItems.push({
      name: localization.concept.subjectHeader,
      prefLabel: localization.concept.subjectHeader
    });
  }
  if (
    _.get(conceptItem, 'altLabel[0]') ||
    _.get(conceptItem, 'hiddenLabel[0]')
  ) {
    menuItems.push({
      name: localization.concept.termHeader,
      prefLabel: localization.concept.termHeader
    });
  }

  if (
    getTranslateText(_.get(conceptItem, ['definition', 'range', 'text'])) &&
    !_.isEmpty(_.get(conceptItem, ['definition', 'range']))
  ) {
    menuItems.push({
      name: localization.concept.range,
      prefLabel: localization.concept.range
    });
  }

  menuItems.push({
    name: localization.concept.identifier,
    prefLabel: localization.concept.identifier
  });

  if (conceptItem.datasets && conceptItem.datasets.length > 0) {
    menuItems.push({
      name: localization.concept.datasetReferences,
      prefLabel: localization.concept.datasetReferences
    });
  }

  if (
    conceptItem.informationModels &&
    conceptItem.informationModels.length > 0
  ) {
    menuItems.push({
      name: localization.concept.informationModelReferences,
      prefLabel: localization.concept.informationModelReferences
    });
  }

  if (conceptItem.concepts && conceptItem.concepts.length > 0) {
    menuItems.push({
      name: localization.conceptReferences.sideMenuTitle,
      prefLabel: localization.conceptReferences.sideMenuTitle
    });
  }

  if (
    _.get(conceptItem, 'contactPoint') &&
    !_.isEmpty(_.get(conceptItem, 'contactPoint'))
  ) {
    menuItems.push({
      name: localization.contactInfo,
      prefLabel: localization.contactInfo
    });
  }

  return <StickyMenu title={localization.goTo} menuItems={menuItems} />;
};
export const ConceptDetailsPage = ({
  conceptItem,
  conceptDatasetReferences,
  publisherItems,
  conceptReferences,
  informationModelReferences,
  fetchPublishersIfNeeded,
  fetchConceptReferences,
  fetchInformationModelReferences
}) => {
  fetchPublishersIfNeeded();

  if (!conceptItem) {
    return null;
  }

  if (!conceptReferences) {
    const { seeAlso = [] } = conceptItem;
    const identifiers = [...seeAlso];

    if (identifiers.length > 0) {
      fetchConceptReferences({
        identifiers: identifiers.join(','),
        size: identifiers.length
      });
    }
  }

  if (!informationModelReferences && fetchInformationModelReferences) {
    fetchInformationModelReferences({
      conceptIdentifiers: conceptItem.identifier,
      size: 1000
    });
  }

  const meta = {
    title: getTranslateText(_.get(conceptItem, 'prefLabel')),
    description: getTranslateText(_.get(conceptItem, ['definition', 'text']))
  };

  const source = {
    sourceRelationship: _.get(
      conceptItem,
      ['definition', 'sourceRelationship'],
      ''
    ),
    sources: _.get(conceptItem, ['definition', 'sources'], [])
  };

  return (
    <main id="content" className="container">
      <article>
        <div className="row">
          <div className="col-12 col-lg-8  offset-lg-4">
            <DocumentMeta {...meta} />

            <div className="d-flex align-items-center fdk-detail-date mb-5">
              <i className="align-self-center fdk-icon-catalog-concept mr-2" />
              <strong className="align-self-center">
                {localization.concept.conceptDescription}&nbsp;
              </strong>
              <HarvestDate
                className="align-self-center"
                harvest={_.get(conceptItem, 'harvest')}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-4 ">
            {renderStickyMenu({
              ...conceptItem,
              datasets: conceptDatasetReferences,
              concepts: conceptReferences,
              informationModels: informationModelReferences
            })}
          </div>
          <section className="col-12 col-lg-8 mt-3">
            <div name={getTranslateText(_.get(conceptItem, 'prefLabel'))}>
              <SearchHitHeader
                title={getTranslateText(_.get(conceptItem, 'prefLabel'))}
                publisherLabel={`${localization.responsible}:`}
                publisher={_.get(conceptItem, 'publisher')}
                publisherTag="span"
                publisherItems={publisherItems}
                validFromIncluding={conceptItem.validFromIncluding}
                validToIncluding={conceptItem.validToIncluding}
                darkThemeBackground
              />
              {renderDescription(_.get(conceptItem, ['definition', 'text']))}
              {renderSource(source)}
            </div>

            {renderValidity(
              conceptItem.validFromIncluding,
              conceptItem.validToIncluding
            )}
            {renderRemark(_.get(conceptItem, ['definition', 'remark']))}
            {renderSample(_.get(conceptItem, 'example'))}
            {renderSubjectAndApplication(
              _.get(conceptItem, 'subject'),
              _.get(conceptItem, 'application')
            )}
            {renderTerms(
              _.get(conceptItem, 'altLabel'),
              _.get(conceptItem, 'hiddenLabel')
            )}
            {renderRange(_.get(conceptItem, ['definition', 'range']))}
            {renderIdentifiers(_.get(conceptItem, 'id'))}
            {renderDatasets(conceptDatasetReferences)}
            {renderInformationModelReferences(informationModelReferences)}
            {renderConceptReferences(conceptItem, conceptReferences)}
            {renderContactPoint(_.get(conceptItem, 'contactPoint'))}
          </section>
        </div>
      </article>
    </main>
  );
};

ConceptDetailsPage.defaultProps = {
  conceptItem: null,
  publisherItems: null,
  fetchPublishersIfNeeded: _.noop
};

ConceptDetailsPage.propTypes = {
  conceptItem: PropTypes.object,
  publisherItems: PropTypes.object,
  fetchPublishersIfNeeded: PropTypes.func
};
