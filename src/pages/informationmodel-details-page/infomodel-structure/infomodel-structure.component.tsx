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
import { ReferenceList } from './reference-list/reference-list.component';

interface Props {
  informationModelDocument: InformationModelDocument;
}

export const InfoModelStructure: FC<Props> = ({
  informationModelDocument: {
    title,
    informationModelDescription,
    rootObject,
    objectTypes,
    codeTypes,
    dataTypes,
    simpleTypes
  }
}) => (
  <SC.InfoModelStructure>
    <SC.Title>{getTranslateText(title)}</SC.Title>

    {informationModelDescription && (
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
            <Description modelDescription={informationModelDescription} />
          </ExpansionPanelBody>
        </SC.ObjectTypeExpansionPanel>
      </SC.Section>
    )}

    {rootObject && (
      <SC.Section>
        <SC.SectionHeader>
          {localization.infoMod.structure.rootObjectType}
        </SC.SectionHeader>
        <SC.ObjectTypeExpansionPanel id={rootObject.id}>
          <ExpansionPanelHead>
            {getTranslateText(rootObject.modelDescription?.name)}
          </ExpansionPanelHead>
          <ExpansionPanelBody>
            {rootObject.modelDescription && (
              <SC.ObjectTypeExpansionPanel
                showWithoutHeadAndPadding
                shouldExpandOnHeadClick={false}
                expansionIndicator={{
                  expand: <ExpansionIndicatorDetails />,
                  collapse: <ExpansionIndicatorDetails isExpanded />
                }}
              >
                <ExpansionPanelBody>
                  <Description modelDescription={rootObject.modelDescription} />
                </ExpansionPanelBody>
              </SC.ObjectTypeExpansionPanel>
            )}
            <ModelElementList
              title={localization.infoMod.structure.role}
              listOfObjectTypes={rootObject.roleList}
            />
          </ExpansionPanelBody>
        </SC.ObjectTypeExpansionPanel>
      </SC.Section>
    )}

    {objectTypes && (
      <SC.Section>
        <SC.SectionHeader>
          {localization.infoMod.structure.objectType}
        </SC.SectionHeader>
        {objectTypes.map(objectType => (
          <SC.ObjectTypeExpansionPanel key={objectType.id} id={objectType.id}>
            <ExpansionPanelHead>
              {getTranslateText(objectType.modelDescription?.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {objectType.modelDescription && (
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
                      modelDescription={objectType.modelDescription}
                    />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                listOfObjectTypes={objectType.attributeList}
              />
              <ModelElementList
                title={localization.infoMod.structure.role}
                listOfObjectTypes={objectType.roleList}
              />
              <ReferenceList
                title={localization.infoMod.structure.extendsFrom}
                extendsFromList={objectType.extendsFrom}
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
        {codeTypes.map(codeType => (
          <SC.ObjectTypeExpansionPanel key={codeType.id} id={codeType.id}>
            <ExpansionPanelHead>
              {getTranslateText(codeType.modelDescription?.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {codeType.modelDescription && (
                <SC.ObjectTypeExpansionPanel
                  showWithoutHeadAndPadding
                  shouldExpandOnHeadClick={false}
                  expansionIndicator={{
                    expand: <ExpansionIndicatorDetails />,
                    collapse: <ExpansionIndicatorDetails isExpanded />
                  }}
                >
                  <ExpansionPanelBody>
                    <Description modelDescription={codeType.modelDescription} />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                listOfObjectTypes={codeType.codeList}
              />
              <ReferenceList
                title={localization.infoMod.structure.externalCodelist}
                referenceList={codeType.externalCodeList}
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
        {dataTypes.map(dataType => (
          <SC.ObjectTypeExpansionPanel key={dataType.id} id={dataType.id}>
            <ExpansionPanelHead>
              {getTranslateText(dataType.modelDescription?.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {dataType.modelDescription && (
                <SC.ObjectTypeExpansionPanel
                  showWithoutHeadAndPadding
                  shouldExpandOnHeadClick={false}
                  expansionIndicator={{
                    expand: <ExpansionIndicatorDetails />,
                    collapse: <ExpansionIndicatorDetails isExpanded />
                  }}
                >
                  <ExpansionPanelBody>
                    <Description modelDescription={dataType.modelDescription} />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                listOfObjectTypes={dataType.attributeList}
              />
              <ReferenceList
                title={localization.infoMod.structure.extendsFrom}
                extendsFromList={dataType.extendsFrom}
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
        {simpleTypes.map(simpleType => (
          <SC.ObjectTypeExpansionPanel key={simpleType.id} id={simpleType.id}>
            <ExpansionPanelHead>
              {getTranslateText(simpleType.modelDescription?.name)}
            </ExpansionPanelHead>
            <ExpansionPanelBody>
              {simpleType.modelDescription && (
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
                      modelDescription={simpleType.modelDescription}
                    />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
              <ReferenceList
                title={localization.infoMod.structure.extendsFrom}
                extendsFromList={simpleType.extendsFrom}
              />
              <ReferenceList
                title={localization.infoMod.structure.distributionReference}
                referenceList={simpleType.distributionReference}
              />
            </ExpansionPanelBody>
          </SC.ObjectTypeExpansionPanel>
        ))}
      </SC.Section>
    )}
  </SC.InfoModelStructure>
);
