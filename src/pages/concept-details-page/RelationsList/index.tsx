import React from 'react';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';
import RelationList from '../../../components/relation-list';
import { SearchObject } from '../../../types';

interface Props {
  identifier: string | undefined;
  conceptsRelations: SearchObject[];
  datasetsRelations: SearchObject[];
  publicServicesRelations: SearchObject[];
  informationModelsRelations: SearchObject[];
}

const RelationsList = ({
  identifier,
  conceptsRelations,
  datasetsRelations,
  publicServicesRelations,
  informationModelsRelations
}: Props) => (
  <ContentSection
    id='relationList'
    title={translations.detailsPage.relationList.title.concept}
  >
    <RelationList
      parentIdentifier={identifier}
      concepts={conceptsRelations}
      datasets={datasetsRelations}
      publicServices={publicServicesRelations}
      informationModels={informationModelsRelations}
    />
  </ContentSection>
);

export default RelationsList;
