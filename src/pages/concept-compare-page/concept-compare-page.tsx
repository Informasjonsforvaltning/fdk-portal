import React, { FC, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import _ from 'lodash';
import qs from 'qs';
import { Helmet } from 'react-helmet';

import LinkExternal from '@fellesdatakatalog/link';

import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';

import './concept-compare.scss';

interface Props {
  fetchConceptsToCompareIfNeeded?: (ids: string[]) => void;
  removeConcept?: (id: string) => void;
  conceptsCompare?: Record<string, any>;
}

const onDeleteConcept = (
  id: string,
  history: any,
  conceptIdsArray: any[],
  removeConcept: any
) => {
  removeConcept(id);
  const filteredConceptIds = conceptIdsArray.filter(item => item !== id);
  history.push(`?compare=${filteredConceptIds}`);
};

const renderTitle = (label: any, items: any, field: any) => (
  <thead className='sticky'>
    <tr>
      <th>{label}</th>
      {Object.keys(items).map((item, index) => (
        <th key={`row-title-${field}-${index}`}>
          <h3>{getTranslateText(_.get(items[item], field))}</h3>
        </th>
      ))}
    </tr>
  </thead>
);

const existFieldValue = (value: any) =>
  Array.isArray(value) ? value.some(Boolean) : !!value;

const existValuesOnAnyItem = (items: any, fieldPath: string[]) =>
  Object.values(items).some(item => existFieldValue(_.get(item, fieldPath)));

const renderFieldValue = (
  item: any,
  fieldPath: string[],
  fieldPathFallback: string[],
  index: number
) => {
  const fieldValue = _.get(item, fieldPath) || _.get(item, fieldPathFallback);

  return (
    <td key={`row-${fieldPath}-${index}`}>
      {Array.isArray(fieldValue)
        ? fieldValue.map((value, fieldIndex) => (
            <span key={fieldIndex} className='mr-2'>
              {getTranslateText(value)}
            </span>
          ))
        : getTranslateText(fieldValue)}
    </td>
  );
};

const renderRow = (
  label: any,
  items: any,
  fieldPath: string[],
  fieldPathFallback: string[] = []
) =>
  existValuesOnAnyItem(items, fieldPath) ||
  existValuesOnAnyItem(items, fieldPathFallback) ? (
    <tr>
      <td>
        <strong>{label}</strong>
      </td>
      {Object.values(items).map((item, index) =>
        renderFieldValue(item, fieldPath, fieldPathFallback, index)
      )}
    </tr>
  ) : null;

const renderRowUrl = (label: any, items: any, fieldPath: any) =>
  existValuesOnAnyItem(items, fieldPath) ? (
    <tr>
      <td>
        <strong>{label}</strong>
      </td>
      {Object.values(items)
        .map(item => _.get(item, fieldPath))
        .map((fieldValue, index) => (
          <td key={`row-${fieldPath}-${index}`}>
            {_.get(fieldValue, 'uri') ? (
              <LinkExternal href={_.get(fieldValue, 'uri')} external>
                {_.get(fieldValue, 'prefLabel') || _.get(fieldValue, 'uri')}
              </LinkExternal>
            ) : (
              getTranslateText(_.get(fieldValue, 'prefLabel'))
            )}
          </td>
        ))}
    </tr>
  ) : null;

const renderRemoveItem = (
  items: any,
  history: any,
  conceptIdsArray: any[],
  removeConcept: any
) => (
  <tr>
    <td />
    {Object.keys(items).map((item, index) => (
      <td key={`row-button-${index}`}>
        <button
          type='button'
          className='btn fdk-text-size-15 fdk-color-link bg-transparent'
          onClick={() => {
            onDeleteConcept(
              _.get(items, [item, 'id']),
              history,
              conceptIdsArray,
              removeConcept
            );
          }}
        >
          <i className='fa fa-minus-circle' />
          &nbsp;
          {localization.compare.removeCompare}
        </button>
      </td>
    ))}
  </tr>
);

export const ConceptComparePage: FC<Props> = ({
  conceptsCompare,
  fetchConceptsToCompareIfNeeded,
  removeConcept
}) => {
  const history = useHistory();
  const { search } = useLocation();

  const searchParameters = qs.parse(search, {
    ignoreQueryPrefix: true
  });
  const conceptIdsArray = ((searchParameters?.compare ?? '') as string).split(
    ','
  );

  useEffect(() => {
    fetchConceptsToCompareIfNeeded?.(conceptIdsArray);
  }, [searchParameters?.compare]);

  return (
    <main id='content' className='container'>
      <article>
        <div className='row'>
          <div className='col-12'>
            <Helmet>
              <title>{localization.menu.conceptsCompare}</title>
              <meta
                property='og:title'
                content={localization.menu.conceptsCompare}
              />
            </Helmet>
            {conceptsCompare && (
              <>
                <h1 className='title'>
                  {localization.menu.conceptsCompare} (
                  {Object.keys(conceptsCompare).length})
                </h1>

                <section className='scrollable'>
                  <table className='table'>
                    {renderTitle(
                      localization.facet.concept,
                      conceptsCompare,
                      'prefLabel'
                    )}
                    <tbody>
                      {renderRow(
                        localization.responsible,
                        conceptsCompare,
                        ['publisher', 'prefLabel'],
                        ['publisher', 'name']
                      )}
                      {renderRow(
                        localization.compare.definition,
                        conceptsCompare,
                        ['definition', 'text']
                      )}
                      {renderRowUrl(
                        localization.compare.source,
                        conceptsCompare,
                        ['definition', 'source']
                      )}
                      {renderRow(
                        localization.compare.subject,
                        conceptsCompare,
                        ['subject']
                      )}
                      {renderRow(
                        localization.compare.altLabel,
                        conceptsCompare,
                        ['altLabel']
                      )}
                      {renderRow(
                        localization.compare.hiddenLabel,
                        conceptsCompare,
                        ['hiddenLabel']
                      )}

                      {renderRemoveItem(
                        conceptsCompare,
                        history,
                        conceptIdsArray,
                        removeConcept
                      )}
                    </tbody>
                  </table>
                </section>
              </>
            )}
          </div>
        </div>
      </article>
    </main>
  );
};
