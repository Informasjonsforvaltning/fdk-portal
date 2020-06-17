import React, { FC } from 'react';
import Scroll from 'react-scroll';

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
import ListTitleSC from './list-title/styled';
import { LinkExternal } from '../../../components/link-external/link-external.component';
import ModelFieldSC from './model-field/styled';

const ScrollLink = Scroll.Link;

interface Props {
  informationModelDocument: InformationModelDocument;
}

export const InfoModelStructure: FC<Props> = ({
  informationModelDocument: {
    name,
    identifier,
    modelDescription,
    version,
    concept,
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
            identifier={identifier}
            version={version}
            concept={concept}
            description={modelDescription}
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
              {(node.identifier || node.concept) && (
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
                      identifier={node.identifier}
                      description={node.description}
                      concept={node.concept}
                      belongsToModule={node.belongsToModule}
                    />
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

              {node.isSubclassOf?.identifier && (
                <>
                  <ListTitleSC.ListTitle>
                    {localization.infoMod.structure.extendsFrom}
                  </ListTitleSC.ListTitle>
                  <ModelFieldSC.ModelField>
                    <ScrollLink
                      to={node.isSubclassOf.identifier}
                      spy
                      smooth
                      isDynamic
                      offset={0}
                      duration={1500}
                    >
                      <span>
                        {getTranslateText(node.isSubclassOf.name) ||
                          node.isSubclassOf.identifier}
                      </span>
                    </ScrollLink>
                  </ModelFieldSC.ModelField>
                </>
              )}
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
              {(node.identifier || node.concept) && (
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
                      identifier={node.identifier}
                      description={node.description}
                      concept={node.concept}
                      belongsToModule={node.belongsToModule}
                    />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}

              {node.codeListReference && (
                <>
                  <ListTitleSC.ListTitle>
                    {localization.infoMod.structure.externalCodelist}
                  </ListTitleSC.ListTitle>
                  <ModelFieldSC.ModelField>
                    <LinkExternal
                      uri={node.codeListReference}
                      prefLabel={node.codeListReference}
                      openInNewTab={false}
                    />
                  </ModelFieldSC.ModelField>
                </>
              )}

              <ModelElementList
                title={localization.infoMod.structure.code}
                properties={node.properties}
              />

              {node.isSubclassOf?.identifier && (
                <>
                  <ListTitleSC.ListTitle>
                    {localization.infoMod.structure.extendsFrom}
                  </ListTitleSC.ListTitle>
                  <ModelFieldSC.ModelField>
                    <ScrollLink
                      to={node.isSubclassOf.identifier}
                      spy
                      smooth
                      isDynamic
                      offset={0}
                      duration={1500}
                    >
                      <span>
                        {getTranslateText(node.isSubclassOf.name) ||
                          node.isSubclassOf.identifier}
                      </span>
                    </ScrollLink>
                  </ModelFieldSC.ModelField>
                </>
              )}
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
              {(node.identifier || node.concept) && (
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
                      identifier={node.identifier}
                      description={node.description}
                      concept={node.concept}
                      belongsToModule={node.belongsToModule}
                    />
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

              {node.isSubclassOf?.identifier && (
                <>
                  <ListTitleSC.ListTitle>
                    {localization.infoMod.structure.extendsFrom}
                  </ListTitleSC.ListTitle>
                  <ModelFieldSC.ModelField>
                    <ScrollLink
                      to={node.isSubclassOf.identifier}
                      spy
                      smooth
                      isDynamic
                      offset={0}
                      duration={1500}
                    >
                      <span>
                        {getTranslateText(node.isSubclassOf.name) ||
                          node.isSubclassOf.identifier}
                      </span>
                    </ScrollLink>
                  </ModelFieldSC.ModelField>
                </>
              )}
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
              {(node.identifier || node.concept) && (
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
                      identifier={node.identifier}
                      description={node.description}
                      concept={node.concept}
                      belongsToModule={node.belongsToModule}
                    />
                  </ExpansionPanelBody>
                </SC.ObjectTypeExpansionPanel>
              )}
              {node.typeDefinitionReference && (
                <>
                  <ListTitleSC.ListTitle>
                    {localization.infoMod.structure.definitionReference}
                  </ListTitleSC.ListTitle>
                  <ModelFieldSC.ModelField>
                    <LinkExternal
                      uri={node.typeDefinitionReference}
                      prefLabel={node.typeDefinitionReference}
                      openInNewTab={false}
                    />
                  </ModelFieldSC.ModelField>
                </>
              )}
              <ModelElementList
                title={localization.infoMod.structure.attribute}
                properties={node.attributes}
              />
              <ModelElementList
                title={localization.infoMod.structure.role}
                properties={node.roles}
              />
              {node.isSubclassOf?.identifier && (
                <>
                  <ListTitleSC.ListTitle>
                    {localization.infoMod.structure.extendsFrom}
                  </ListTitleSC.ListTitle>
                  <ModelFieldSC.ModelField>
                    <ScrollLink
                      to={node.isSubclassOf.identifier}
                      spy
                      smooth
                      isDynamic
                      offset={0}
                      duration={1500}
                    >
                      <span>
                        {getTranslateText(node.isSubclassOf.name) ||
                          node.isSubclassOf.identifier}
                      </span>
                    </ScrollLink>
                  </ModelFieldSC.ModelField>
                </>
              )}
            </ExpansionPanelBody>
          </SC.ObjectTypeExpansionPanel>
        ))}
      </SC.Section>
    )}
  </SC.InfoModelStructure>
);
