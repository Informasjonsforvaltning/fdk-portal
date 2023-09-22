import React from 'react';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';
import RelationList, {
  ItemWithRelationType
} from '../../../components/relation-list';
import {
  Concept,
  Dataset,
  InformationModel,
  PublicService
} from '../../../types';

interface Props {
  identifier: string | undefined;
  conceptsRelations: Concept[];
  datasetsRelations: Dataset[];
  publicServicesRelations: PublicService[];
  informationModelsRelations: InformationModel[];
}

const RelationsList = ({
  identifier,
  conceptsRelations,
  datasetsRelations,
  publicServicesRelations,
  informationModelsRelations
}: Props) => {
  const publicServicesRelationsWithRelationType: ItemWithRelationType[] =
    publicServicesRelations.map(relation => ({
      relation,
      relationType: translations.sampleData
    }));

  return (
    <ContentSection
      id='relationList'
      title={translations.detailsPage.relationList.title.concept}
    >
      <RelationList
        parentIdentifier={identifier}
        concepts={conceptsRelations}
        datasets={datasetsRelations}
        publicServices={publicServicesRelationsWithRelationType}
        informationModels={informationModelsRelations}
      />
    </ContentSection>
  );
};

export default RelationsList;
