import React, { memo, FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'redux';
import Link from '@fellesdatakatalog/link';

import SC from './styled';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';

import ConceptIcon from '../../images/icon-catalog-concept-lg.svg';
import DatasetIcon from '../../images/icon-catalog-dataset-lg.svg';
import DataServiceIcon from '../../images/icon-catalog-api-lg.svg';
import InformationModelIcon from '../../images/icon-catalog-infomod-lg.svg';
import PublicServiceIcon from '../../images/icon-catalog-service-lg.svg';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_EVENTS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES
} from '../../constants/constants';

import type { SearchObject } from '../../types';
import { filterRelations, getRelationType } from '../../utils/common';
import { Entity } from '../../types/enums';

interface RelationProps {
  parentIdentifier?: string;
  datasets?: SearchObject[];
  dataServices?: SearchObject[];
  concepts?: SearchObject[];
  informationModels?: SearchObject[];
  publicServices?: SearchObject[];
  events?: SearchObject[];
}

interface Props extends RelationProps {}

const renderReferenceString = (
  parentIdentifier?: string,
  references?: any[]
) => {
  if (parentIdentifier) {
    const referenceTypes = references?.reduce(
      (previous, { source = {}, referenceType = {} }) =>
        source?.uri === parentIdentifier && referenceType?.prefLabel
          ? [...previous, translate(referenceType.prefLabel)?.toLowerCase()]
          : previous,
      [] as string[]
    );
    return referenceTypes?.length > 0
      ? `  (${
          translations.detailsPage.relationList.referenceType
        }: ${referenceTypes.join(', ')})`
      : '';
  }
  return null;
};

const RelationsList: FC<Props> = ({
  parentIdentifier,
  datasets,
  dataServices,
  concepts,
  informationModels,
  publicServices,
  events
}) => (
  <>
    {datasets && datasets.length > 0 ? (
      <SC.Relation>
        <SC.Banner>
          <SC.IconBackground>
            <DatasetIcon />
          </SC.IconBackground>
          <h3>{translations.detailsPage.relationList.subtitle.dataset}</h3>
        </SC.Banner>

        <SC.RelationLinks>
          {datasets.map(({ uri, title, id }) =>
            uri && id && title ? (
              <span>
                <Link as={RouterLink} to={`${PATHNAME_DATASETS}/${id}`}>
                  {translate(title ?? uri)}
                </Link>
                {renderReferenceString(
                  parentIdentifier,
                  filterRelations(datasets, Entity.DATASET, 'reference', uri)
                )}
              </span>
            ) : null
          )}
        </SC.RelationLinks>
      </SC.Relation>
    ) : null}

    {dataServices && dataServices.length > 0 ? (
      <SC.Relation>
        <SC.Banner>
          <SC.IconBackground>
            <DataServiceIcon />
          </SC.IconBackground>
          <h3>{translations.detailsPage.relationList.subtitle.dataservice}</h3>
        </SC.Banner>

        <SC.RelationLinks>
          {dataServices.map(({ uri, title, id }) =>
            uri && id && title ? (
              <Link as={RouterLink} to={`${PATHNAME_DATA_SERVICES}/${id}`}>
                {translate(title ?? uri)}
              </Link>
            ) : null
          )}
        </SC.RelationLinks>
      </SC.Relation>
    ) : null}

    {concepts && concepts.length > 0 ? (
      <SC.Relation>
        <SC.Banner>
          <SC.IconBackground>
            <ConceptIcon />
          </SC.IconBackground>
          <h3>{translations.detailsPage.relationList.subtitle.concept}</h3>
        </SC.Banner>

        <SC.RelationLinks>
          {concepts.map(({ uri, title, id }) =>
            uri && id && title ? (
              <Link
                key={id ?? uri}
                as={RouterLink}
                to={`${PATHNAME_CONCEPTS}/${id}`}
              >
                {translate(title ?? uri)}
              </Link>
            ) : null
          )}
        </SC.RelationLinks>
      </SC.Relation>
    ) : null}

    {informationModels && informationModels.length > 0 ? (
      <SC.Relation>
        <SC.Banner>
          <SC.IconBackground>
            <InformationModelIcon />
          </SC.IconBackground>
          <h3>
            {translations.detailsPage.relationList.subtitle.informationmodel}
          </h3>
        </SC.Banner>

        <SC.RelationLinks>
          {informationModels.map(({ uri, title, id }) =>
            uri && id && title ? (
              <Link as={RouterLink} to={`${PATHNAME_INFORMATIONMODELS}/${id}`}>
                {translate(title ?? uri)}
              </Link>
            ) : null
          )}
        </SC.RelationLinks>
      </SC.Relation>
    ) : null}

    {publicServices && publicServices.length > 0 ? (
      <SC.Relation>
        <SC.Banner>
          <SC.IconBackground>
            <PublicServiceIcon />
          </SC.IconBackground>
          <h3>
            {translations.detailsPage.relationList.subtitle.public_service}
          </h3>
        </SC.Banner>

        <SC.RelationLinks>
          {publicServices.map(({ id, title, uri }) =>
            uri && id && title ? (
              <span>
                <Link as={RouterLink} to={`${PATHNAME_PUBLIC_SERVICES}/${id}`}>
                  {translate(title ?? uri)}
                </Link>
                ({getRelationType(uri, publicServices)})
              </span>
            ) : null
          )}
        </SC.RelationLinks>
      </SC.Relation>
    ) : null}

    {events && events.length > 0 ? (
      <SC.Relation>
        <SC.Banner>
          <SC.IconBackground>
            <PublicServiceIcon />
          </SC.IconBackground>
          <h3>{translations.detailsPage.relationList.subtitle.event}</h3>
        </SC.Banner>

        <SC.RelationLinks>
          {events.map(({ id, title, uri }) =>
            uri && id && title ? (
              <span>
                <Link as={RouterLink} to={`${PATHNAME_EVENTS}/${id}`}>
                  {translate(title ?? uri)}
                </Link>
                ({getRelationType(uri, publicServices)})
              </span>
            ) : null
          )}
        </SC.RelationLinks>
      </SC.Relation>
    ) : null}
  </>
);

export default compose<FC<RelationProps>>(memo)(RelationsList);
