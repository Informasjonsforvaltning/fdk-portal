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
    name,
    identifier,
    description,
    version,
    objectTypes,
    codeTypes,
    dataTypes,
    simpleTypes
  }
}) => (
  <SC.InfoModelStructure>
    <SC.Title>{getTranslateText(name)}</SC.Title>

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
          <Description
            description={description}
            identifier={identifier}
            version={version}
          />
        </ExpansionPanelBody>
      </SC.ObjectTypeExpansionPanel>
    </SC.Section>

    {objectTypes && (
      <SC.Section>
        <SC.SectionHeader>
          {localization.infoMod.structure.objectType}
        </SC.SectionHeader>
        {objectTypes.map(node => (
          <SC.ObjectTypeExpansionPanel
            key={node.identifier}
            id={node.identifier}
          >
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {node.identifier && (
                <SC.ObjectTypeExpansionPanel
                  showWithoutHeadAndPadding
                  shouldExpandOnHeadClick={false}
                  expansionIndicator={{
                    expand: <ExpansionIndicatorDetails />,
                    collapse: <ExpansionIndicatorDetails isExpanded />
                  }}
                >
                  <ExpansionPanelBody>
                    <Description identifier={node.identifier} />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
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
          <SC.ObjectTypeExpansionPanel
            key={node.identifier}
            id={node.identifier}
          >
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {node.identifier && (
                <SC.ObjectTypeExpansionPanel
                  showWithoutHeadAndPadding
                  shouldExpandOnHeadClick={false}
                  expansionIndicator={{
                    expand: <ExpansionIndicatorDetails />,
                    collapse: <ExpansionIndicatorDetails isExpanded />
                  }}
                >
                  <ExpansionPanelBody>
                    <Description identifier={node.identifier} />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
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
          <SC.ObjectTypeExpansionPanel
            key={node.identifier}
            id={node.identifier}
          >
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {node.identifier && (
                <SC.ObjectTypeExpansionPanel
                  showWithoutHeadAndPadding
                  shouldExpandOnHeadClick={false}
                  expansionIndicator={{
                    expand: <ExpansionIndicatorDetails />,
                    collapse: <ExpansionIndicatorDetails isExpanded />
                  }}
                >
                  <ExpansionPanelBody>
                    <Description identifier={node.identifier} />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
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
          <SC.ObjectTypeExpansionPanel
            key={node.identifier}
            id={node.identifier}
          >
            <ExpansionPanelHead>
              {getTranslateText(node.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {node.identifier && (
                <SC.ObjectTypeExpansionPanel
                  showWithoutHeadAndPadding
                  shouldExpandOnHeadClick={false}
                  expansionIndicator={{
                    expand: <ExpansionIndicatorDetails />,
                    collapse: <ExpansionIndicatorDetails isExpanded />
                  }}
                >
                  <ExpansionPanelBody>
                    <Description identifier={node.identifier} />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
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
