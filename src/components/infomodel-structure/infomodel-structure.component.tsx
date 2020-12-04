import React, { FC } from 'react';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';

import { Description } from './model-description/model-description.component';
import { ExpansionIndicatorDetails } from './expansion-indicator-details/expansion-indicator-details.component';
import { ExpansionPanelHead, ExpansionPanelBody } from '../expansion-panel';
import ModelElementList from './model-element-list';
import ValueRestrictions from './value-restrictions';
import ListTitleSC from './list-title/styled';
import ModelFieldSC from './model-field/styled';

import SC from './styled';

import type {
  InformationModelElement,
  InformationModelProperty,
  Concept
} from '../../types';

interface Props {
  modelElements: Record<string, Partial<InformationModelElement>>;
  modelProperties: Record<string, Partial<InformationModelProperty>>;
  concepts: Concept[];
}

export const InfoModelStructure: FC<Props> = ({
  modelElements,
  modelProperties,
  concepts
}) => {
  const rootObjectTypes = Object.values(modelElements)
    .filter(Boolean)
    .filter(({ elementTypes }) =>
      elementTypes?.some(type => type.split('#').includes('RootObjectType'))
    );

  const objectTypes = Object.values(modelElements)
    .filter(Boolean)
    .filter(({ elementTypes }) =>
      elementTypes?.some(type => type.split('#').includes('ObjectType'))
    );

  const codeLists = Object.values(modelElements)
    .filter(Boolean)
    .filter(({ elementTypes }) =>
      elementTypes?.some(type => type.split('#').includes('CodeList'))
    );

  const dataTypes = Object.values(modelElements)
    .filter(Boolean)
    .filter(({ elementTypes }) =>
      elementTypes?.some(type => type.split('#').includes('DataType'))
    );

  const simpleTypes = Object.values(modelElements)
    .filter(Boolean)
    .filter(({ elementTypes }) =>
      elementTypes?.some(type => type.split('#').includes('SimpleType'))
    );

  const unwrapAttributes = (properties?: string[] | null) =>
    properties
      ?.map(property => modelProperties[property])
      .filter(({ propertyTypes }) =>
        propertyTypes?.some(
          type =>
            type.split('#').includes('Attribute') ||
            type.split('#').includes('Collection') ||
            type.split('#').includes('Composition') ||
            type.split('#').includes('Choice')
        )
      )
      .filter(Boolean) ?? [];

  const unwrapAssociations = (properties?: string[] | null) =>
    properties
      ?.map(property => modelProperties[property])
      .filter(({ propertyTypes }) =>
        propertyTypes?.some(type => type.split('#').includes('Association'))
      )
      .filter(Boolean) ?? [];

  const unwrapRoles = (properties?: string[] | null) =>
    properties
      ?.map(property => modelProperties[property])
      .filter(({ propertyTypes }) =>
        propertyTypes?.some(type => type.split('#').includes('Role'))
      )
      .filter(Boolean) ?? [];

  const unwrapAbstraction = (properties?: string[] | null) => {
    const isAbstractionOf = (
      properties
        ?.map(property => modelProperties[property])
        .filter(({ propertyTypes }) =>
          propertyTypes?.some(type => type.split('#').includes('Abstraction'))
        )
        .filter(Boolean) ?? []
    ).shift()?.isAbstractionOf;

    return isAbstractionOf ? modelElements[isAbstractionOf] : null;
  };

  const unwrapRealization = (properties?: string[] | null) => {
    const isRealizationOf = (
      properties
        ?.map(property => modelProperties[property])
        .filter(({ propertyTypes }) =>
          propertyTypes?.some(type => type.split('#').includes('Realization'))
        )
        .filter(Boolean) ?? []
    ).shift()?.hasSupplier;

    return isRealizationOf ? modelElements[isRealizationOf] : null;
  };

  const conceptMap = concepts.reduce<Record<string, Concept>>(
    (previous, current) => ({ ...previous, [current.identifier]: current }),
    {}
  );

  return (
    <SC.InfoModelStructure>
      {rootObjectTypes.length > 0 && (
        <SC.Section>
          <SC.SectionHeader>
            {translations.infoMod.structure.rootObjectType}
          </SC.SectionHeader>
          {rootObjectTypes.map(
            ({
              identifier,
              uri,
              title,
              description,
              belongsToModule,
              subject,
              hasProperty
            }) => (
              <SC.ObjectTypeExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier || description || belongsToModule) && (
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
                          description={description}
                          concept={subject ? conceptMap[subject] : undefined}
                          abstraction={unwrapAbstraction(hasProperty)}
                          realization={unwrapRealization(hasProperty)}
                          belongsToModule={belongsToModule}
                        />
                      </ExpansionPanelBody>
                    </SC.ObjectTypeExpansionPanel>
                  )}
                  <ModelElementList
                    title={translations.infoMod.structure.attribute}
                    properties={unwrapAttributes(hasProperty)}
                    modelElements={modelElements}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.association}
                    properties={unwrapAssociations(hasProperty)}
                    modelElements={modelElements}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.role}
                    properties={unwrapRoles(hasProperty)}
                    modelElements={modelElements}
                  />
                </ExpansionPanelBody>
              </SC.ObjectTypeExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {objectTypes.length > 0 && (
        <SC.Section>
          <SC.SectionHeader>
            {translations.infoMod.structure.objectType}
          </SC.SectionHeader>
          {objectTypes.map(
            ({
              identifier,
              uri,
              title,
              description,
              belongsToModule,
              subject,
              hasProperty
            }) => (
              <SC.ObjectTypeExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier || description || belongsToModule) && (
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
                          description={description}
                          concept={subject ? conceptMap[subject] : undefined}
                          abstraction={unwrapAbstraction(hasProperty)}
                          realization={unwrapRealization(hasProperty)}
                          belongsToModule={belongsToModule}
                        />
                      </ExpansionPanelBody>
                    </SC.ObjectTypeExpansionPanel>
                  )}
                  <ModelElementList
                    title={translations.infoMod.structure.attribute}
                    properties={unwrapAttributes(hasProperty)}
                    modelElements={modelElements}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.association}
                    properties={unwrapAssociations(hasProperty)}
                    modelElements={modelElements}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.role}
                    properties={unwrapRoles(hasProperty)}
                    modelElements={modelElements}
                  />
                </ExpansionPanelBody>
              </SC.ObjectTypeExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {codeLists.length > 0 && (
        <SC.Section>
          <SC.SectionHeader>
            {translations.infoMod.structure.codeList}
          </SC.SectionHeader>
          {codeLists.map(
            ({
              identifier,
              uri,
              title,
              description,
              belongsToModule,
              codeListReference,
              codes
            }) => (
              <SC.ObjectTypeExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier || description || belongsToModule) && (
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
                          description={description}
                          belongsToModule={belongsToModule}
                        />
                      </ExpansionPanelBody>
                    </SC.ObjectTypeExpansionPanel>
                  )}
                  {codes && codes.length > 0 && (
                    <ModelElementList
                      title={translations.infoMod.structure.code}
                      properties={codes}
                      modelElements={modelElements}
                    />
                  )}
                  {codeListReference && (
                    <>
                      <ListTitleSC.ListTitle>
                        {translations.infoMod.structure.externalCodelist}
                      </ListTitleSC.ListTitle>
                      <ModelFieldSC.ModelField>
                        <Link href={codeListReference} external>
                          {codeListReference}
                        </Link>
                      </ModelFieldSC.ModelField>
                    </>
                  )}
                </ExpansionPanelBody>
              </SC.ObjectTypeExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {dataTypes.length > 0 && (
        <SC.Section>
          <SC.SectionHeader>
            {translations.infoMod.structure.dataType}
          </SC.SectionHeader>
          {dataTypes.map(
            ({
              identifier,
              uri,
              title,
              description,
              belongsToModule,
              subject,
              hasProperty
            }) => (
              <SC.ObjectTypeExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier || description || belongsToModule) && (
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
                          description={description}
                          concept={subject ? conceptMap[subject] : undefined}
                          belongsToModule={belongsToModule}
                        />
                      </ExpansionPanelBody>
                    </SC.ObjectTypeExpansionPanel>
                  )}
                  <ModelElementList
                    title={translations.infoMod.structure.attribute}
                    properties={unwrapAttributes(hasProperty)}
                    modelElements={modelElements}
                  />
                </ExpansionPanelBody>
              </SC.ObjectTypeExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {simpleTypes.length > 0 && (
        <SC.Section>
          <SC.SectionHeader>
            {translations.infoMod.structure.simpleType}
          </SC.SectionHeader>
          {simpleTypes.map(
            ({
              identifier,
              uri,
              title,
              description,
              belongsToModule,
              typeDefinitionReference,
              length,
              maxLength,
              minInclusive,
              maxInclusive,
              pattern,
              totalDigits
            }) => (
              <SC.ObjectTypeExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier || description || belongsToModule) && (
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
                          description={description}
                          belongsToModule={belongsToModule}
                        />
                      </ExpansionPanelBody>
                    </SC.ObjectTypeExpansionPanel>
                  )}
                  {typeDefinitionReference && (
                    <>
                      <ListTitleSC.ListTitle>
                        {translations.infoMod.structure.definitionReference}
                      </ListTitleSC.ListTitle>
                      <ModelFieldSC.ModelField>
                        <Link href={typeDefinitionReference} external>
                          {typeDefinitionReference}
                        </Link>
                      </ModelFieldSC.ModelField>
                    </>
                  )}
                  <ValueRestrictions
                    title={translations.infoMod.structure.restrictions}
                    length={length}
                    maxLength={maxLength}
                    minInclusive={minInclusive}
                    maxInclusive={maxInclusive}
                    pattern={pattern}
                    totalDigits={totalDigits}
                  />
                </ExpansionPanelBody>
              </SC.ObjectTypeExpansionPanel>
            )
          )}
        </SC.Section>
      )}
    </SC.InfoModelStructure>
  );
};
