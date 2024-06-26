import React, { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { Helmet } from 'react-helmet';

import LinkExternal from '@fellesdatakatalog/link';
import CircleMinusIcon from '@fellesdatakatalog/icons/assets/svg/circle-minus-stroke.svg';
import qs from 'qs';

import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';

import './concept-compare.scss';

interface Props {
  fetchFullConceptsToCompareIfNeeded: (ids: string[]) => void;
  removeConcept?: (id: string) => void;
  removeFullConcept?: (id: string) => void;
  fullConceptsCompare?: Record<string, any>;
}

const onDeleteConcept = (
  id: string,
  history: any,
  conceptIdsArray: any[],
  removeConcept: any,
  removeFullConcept: any
) => {
  removeConcept(id);
  removeFullConcept(id);
  const filteredConceptIds = conceptIdsArray.filter(item => item !== id);
  history.push(`?compare=${filteredConceptIds}`);
};

const renderTitle = (label: any, items: any, field: any) => (
  <thead className='sticky'>
    <tr>
      <th scope='col'>{label}</th>
      {Object.keys(items).map((item, index) => (
        <th scope='col' key={`row-title-${field}-${index}`}>
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
  removeConcept: any,
  removeFullConcept: any
) => (
  <tr>
    <td />
    {Object.keys(items).map((item, index) => (
      <td key={`row-button-${index}`}>
        <button
          type='button'
          className='btn fdk-text-size-15 fdk-color-link bg-transparent nowrap'
          onClick={() => {
            onDeleteConcept(
              _.get(items, [item, 'id']),
              history,
              Object.keys(items),
              removeConcept,
              removeFullConcept
            );
          }}
        >
          <CircleMinusIcon className='fdk-compare-icon' />
          &nbsp;
          {localization.compare.removeCompare}
        </button>
      </td>
    ))}
  </tr>
);

export const ConceptComparePage: FC<Props> = ({
  fullConceptsCompare,
  fetchFullConceptsToCompareIfNeeded,
  removeConcept,
  removeFullConcept
}) => {
  const history = useHistory();
  const { search } = useLocation();

  const searchParameters = qs.parse(search, {
    ignoreQueryPrefix: true
  });

  useEffect(() => {
    fetchFullConceptsToCompareIfNeeded(
      (searchParameters?.compare as string)?.split(',') || []
    );
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
            {fullConceptsCompare && (
              <>
                <h1 className='title'>
                  {localization.menu.conceptsCompare} (
                  {Object.keys(fullConceptsCompare).length})
                </h1>

                <section className='scrollable'>
                  <table className='table'>
                    {renderTitle(
                      localization.facet.concept,
                      fullConceptsCompare,
                      'prefLabel'
                    )}
                    <tbody>
                      {renderRow(
                        localization.responsible,
                        fullConceptsCompare,
                        ['publisher', 'prefLabel'],
                        ['publisher', 'name']
                      )}
                      {renderRow(
                        localization.compare.definition,
                        fullConceptsCompare,
                        ['definition', 'text']
                      )}
                      {renderRowUrl(
                        localization.compare.source,
                        fullConceptsCompare,
                        ['definition', 'source']
                      )}
                      {renderRow(
                        localization.compare.subject,
                        fullConceptsCompare,
                        ['subject']
                      )}
                      {renderRow(
                        localization.compare.altLabel,
                        fullConceptsCompare,
                        ['altLabel']
                      )}
                      {renderRow(
                        localization.compare.hiddenLabel,
                        fullConceptsCompare,
                        ['hiddenLabel']
                      )}

                      {renderRemoveItem(
                        fullConceptsCompare,
                        history,
                        removeConcept,
                        removeFullConcept
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
