import React, { FC } from 'react';

import SC from './styled';
import { InformationModelDocument } from '../../../types';
import { getTranslateText } from '../../../lib/translateText';
import { Description } from './model-description/model-description.component';
import localization from '../../../lib/localization';
import { ExpansionIndicatorDetails } from './expansion-indicator-details/expansion-indicator-details.component';
import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '../../../components/expansion-panel';
import { ModelElementList } from './model-element-list/model-element-list.component';

interface Props {
  informationModelDocument: InformationModelDocument;
}

export const InfoModelStructure: FC<Props> = ({
  informationModelDocument: {
    title,
    description,
    objectTypes,
    codeTypes,
    dataTypes,
    simpleTypes
  }
}) => (
  <SC.InfoModelStructure>
    <SC.Title>{getTranslateText(title)}</SC.Title>

    {description && (
      <SC.Section>
        <SC.ObjectTypeExpansionPanel
          showWithoutHeadAndPadding
          shouldExpandOnHeadClick={false}
          expansionIndicator={{
            expand: <ExpansionIndicatorDetails />,
            collapse: <ExpansionIndicatorDetails isExpanded />
          }}
        >
          <ExpansionPanelBody>
            <Description description={description} />
          </ExpansionPanelBody>
        </SC.ObjectTypeExpansionPanel>
      </SC.Section>
    )}

    {objectTypes && (
      <SC.Section>
        <SC.SectionHeader>
          {localization.infoMod.structure.objectType}
        </SC.SectionHeader>
        {objectTypes.map(node => (
          <SC.ObjectTypeExpansionPanel key={node.id} id={node.id}>
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                properties={node.attributes}
              />
              <ModelElementList
                title={localization.infoMod.structure.role}
                properties={node.roles}
              />
            </ExpansionPanelBody>
          </SC.ObjectTypeExpansionPanel>
        ))}
      </SC.Section>
    )}

    {codeTypes && (
      <SC.Section>
        <SC.SectionHeader>
          {localization.infoMod.structure.codeList}
        </SC.SectionHeader>
        {codeTypes.map(node => (
          <SC.ObjectTypeExpansionPanel key={node.id} id={node.id}>
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                properties={node.attributes}
              />
              <ModelElementList
                title={localization.infoMod.structure.role}
                properties={node.roles}
              />
            </ExpansionPanelBody>
          </SC.ObjectTypeExpansionPanel>
        ))}
      </SC.Section>
    )}

    {dataTypes && (
      <SC.Section>
        <SC.SectionHeader>
          {localization.infoMod.structure.dataType}
        </SC.SectionHeader>
        {dataTypes.map(node => (
          <SC.ObjectTypeExpansionPanel key={node.id} id={node.id}>
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                properties={node.attributes}
              />
              <ModelElementList
                title={localization.infoMod.structure.role}
                properties={node.roles}
              />
            </ExpansionPanelBody>
          </SC.ObjectTypeExpansionPanel>
        ))}
      </SC.Section>
    )}

    {simpleTypes && (
      <SC.Section>
        <SC.SectionHeader>
          {localization.infoMod.structure.simpleType}
        </SC.SectionHeader>
        {simpleTypes.map(node => (
          <SC.ObjectTypeExpansionPanel key={node.id} id={node.id}>
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                properties={node.attributes}
              />
              <ModelElementList
                title={localization.infoMod.structure.role}
                properties={node.roles}
              />
            </ExpansionPanelBody>
          </SC.ObjectTypeExpansionPanel>
        ))}
      </SC.Section>
    )}
  </SC.InfoModelStructure>
);
