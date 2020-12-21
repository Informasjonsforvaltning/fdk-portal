import React, { memo, FC } from 'react';
import { compose } from 'redux';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';

import Description from './model-description';
import ExpansionIndicatorDetails from './expansion-indicator-details';
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
import { ModelElementType } from '../../types/enums';

interface ExternalProps {
  modelElements: Record<string, Partial<InformationModelElement>>;
  modelProperties: Record<string, Partial<InformationModelProperty>>;
  concepts: Concept[];
}

interface Props extends ExternalProps {}

const InfoModelStructure: FC<Props> = ({
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

  const unwrapSpecialization = (properties?: string[] | null) =>
    properties
      ?.map(property => modelProperties[property])
      .filter(({ propertyTypes }) =>
        propertyTypes?.some(type => type.split('#').includes('Specialization'))
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

    return isAbstractionOf ? modelElements[isAbstractionOf] : undefined;
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

    return isRealizationOf ? modelElements[isRealizationOf] : undefined;
  };

  const conceptMap = concepts.reduce<Record<string, Concept>>(
    (previous, current) => ({ ...previous, [current.identifier]: current }),
    {}
  );

  return (
    <>
      {rootObjectTypes.length > 0 && (
        <SC.Section>
          <h3>{translations.infoMod.structure.rootObjectType}</h3>
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
              <SC.ExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier ||
                    description ||
                    belongsToModule ||
                    (subject && conceptMap[subject]) ||
                    unwrapAbstraction(hasProperty) ||
                    unwrapRealization(hasProperty)) && (
                    <SC.ExpansionPanel
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
                    </SC.ExpansionPanel>
                  )}
                  <ModelElementList
                    title={translations.infoMod.structure.attribute}
                    properties={unwrapAttributes(hasProperty)}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.ATTRIBUTE}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.association}
                    properties={unwrapAssociations(hasProperty)}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.ASSOCIATION}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.role}
                    properties={unwrapRoles(hasProperty)}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.ROLE}
                  />
                  <ModelElementList
                    title={
                      translations.infoMod.modelDescription.specializationOf
                    }
                    properties={unwrapSpecialization(hasProperty).map(spec => ({
                      ...spec,
                      title
                    }))}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.SPECIALIZATION}
                  />
                </ExpansionPanelBody>
              </SC.ExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {objectTypes.length > 0 && (
        <SC.Section>
          <h3>{translations.infoMod.structure.objectType}</h3>
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
              <SC.ExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier ||
                    description ||
                    belongsToModule ||
                    (subject && conceptMap[subject]) ||
                    unwrapAbstraction(hasProperty) ||
                    unwrapRealization(hasProperty)) && (
                    <SC.ExpansionPanel
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
                    </SC.ExpansionPanel>
                  )}
                  <ModelElementList
                    title={translations.infoMod.structure.attribute}
                    properties={unwrapAttributes(hasProperty)}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.ATTRIBUTE}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.association}
                    properties={unwrapAssociations(hasProperty)}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.ASSOCIATION}
                  />
                  <ModelElementList
                    title={translations.infoMod.structure.role}
                    properties={unwrapRoles(hasProperty)}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.ROLE}
                  />
                  <ModelElementList
                    title={
                      translations.infoMod.modelDescription.specializationOf
                    }
                    properties={unwrapSpecialization(hasProperty).map(spec => ({
                      ...spec,
                      title
                    }))}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.SPECIALIZATION}
                  />
                </ExpansionPanelBody>
              </SC.ExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {codeLists.length > 0 && (
        <SC.Section>
          <h3>{translations.infoMod.structure.codeList}</h3>
          {codeLists.map(
            ({
              identifier,
              uri,
              title,
              description,
              belongsToModule,
              codeListReference,
              codes,
              subject,
              hasProperty
            }) => (
              <SC.ExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier ||
                    description ||
                    belongsToModule ||
                    (subject && conceptMap[subject]) ||
                    unwrapAbstraction(hasProperty) ||
                    unwrapRealization(hasProperty)) && (
                    <SC.ExpansionPanel
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
                    </SC.ExpansionPanel>
                  )}
                  {codes && codes.length > 0 && (
                    <ModelElementList
                      title={translations.infoMod.structure.code}
                      properties={codes}
                      modelElements={modelElements}
                      concepts={conceptMap}
                      type={ModelElementType.CODE_ELEMENT}
                    />
                  )}
                  {codeListReference && (
                    <>
                      <ListTitleSC.ListTitle>
                        {translations.infoMod.structure.externalCodelist}
                      </ListTitleSC.ListTitle>
                      <ModelFieldSC.ModelField>
                        <SC.Link href={codeListReference} external>
                          {codeListReference}
                        </SC.Link>
                      </ModelFieldSC.ModelField>
                    </>
                  )}
                </ExpansionPanelBody>
              </SC.ExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {dataTypes.length > 0 && (
        <SC.Section>
          <h3>{translations.infoMod.structure.dataType}</h3>
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
              <SC.ExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier ||
                    description ||
                    belongsToModule ||
                    (subject && conceptMap[subject]) ||
                    unwrapAbstraction(hasProperty) ||
                    unwrapRealization(hasProperty)) && (
                    <SC.ExpansionPanel
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
                    </SC.ExpansionPanel>
                  )}
                  <ModelElementList
                    title={translations.infoMod.structure.attribute}
                    properties={unwrapAttributes(hasProperty)}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.ATTRIBUTE}
                  />
                  <ModelElementList
                    title={
                      translations.infoMod.modelDescription.specializationOf
                    }
                    properties={unwrapSpecialization(hasProperty).map(spec => ({
                      ...spec,
                      title
                    }))}
                    modelElements={modelElements}
                    concepts={conceptMap}
                    type={ModelElementType.SPECIALIZATION}
                  />
                </ExpansionPanelBody>
              </SC.ExpansionPanel>
            )
          )}
        </SC.Section>
      )}

      {simpleTypes.length > 0 && (
        <SC.Section>
          <h3>{translations.infoMod.structure.simpleType}</h3>
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
              totalDigits,
              subject,
              hasProperty
            }) => (
              <SC.ExpansionPanel
                key={`${identifier}-${uri}`}
                id={uri ?? identifier ?? ''}
              >
                <ExpansionPanelHead>{translate(title)}</ExpansionPanelHead>
                <ExpansionPanelBody>
                  {(identifier ||
                    description ||
                    belongsToModule ||
                    (subject && conceptMap[subject]) ||
                    unwrapAbstraction(hasProperty) ||
                    unwrapRealization(hasProperty)) && (
                    <SC.ExpansionPanel
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
                    </SC.ExpansionPanel>
                  )}
                  {typeDefinitionReference && (
                    <>
                      <ListTitleSC.ListTitle>
                        {translations.infoMod.structure.definitionReference}
                      </ListTitleSC.ListTitle>
                      <ModelFieldSC.ModelField>
                        <SC.Link href={typeDefinitionReference} external>
                          {typeDefinitionReference}
                        </SC.Link>
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
              </SC.ExpansionPanel>
            )
          )}
        </SC.Section>
      )}
    </>
  );
};

export default compose<FC<ExternalProps>>(memo)(InfoModelStructure);
