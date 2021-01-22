import { InformationModelProperty, TextLanguage } from '../../types';

const applyRelationalTitle = (
  hasObjectType?: string | null,
  title?: Partial<TextLanguage> | null
) => {
  const parentObject = hasObjectType?.split('#').pop();
  const objectString = parentObject
    ? `${parentObject.charAt(0).toUpperCase() + parentObject.slice(1)}: `
    : '';
  return title
    ? Object.entries(title).reduce(
        (previous, [key, value]) => ({
          ...previous,
          [key]: objectString + value
        }),
        {} as Partial<TextLanguage>
      )
    : title;
};

export const resolvePropertySymmetries = (
  modelProperties: Record<string, Partial<InformationModelProperty>>
) =>
  Object.entries(modelProperties).reduce((previous, [key, value]) => {
    if (value.formsSymmetryWith) {
      return {
        ...previous,
        [key]: {
          ...value,
          title: applyRelationalTitle(
            modelProperties[value.formsSymmetryWith].hasObjectType,
            value.title
          )
        },
        [value.formsSymmetryWith]: {
          ...modelProperties[value.formsSymmetryWith],
          formsSymmetryWith: key,
          title: applyRelationalTitle(
            value.hasObjectType,
            modelProperties[value.formsSymmetryWith].title
          )
        }
      };
    }

    return { ...previous, [key]: value };
  }, {} as Record<string, Partial<InformationModelProperty>>);
