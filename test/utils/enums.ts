export enum Expectation {
  ROOT_ELEMENT = 'must render correct root element',
  NO_ROOT_ELEMENT = 'must not have a root element',
  NO_CHILDREN = 'must render correct structure if no children are provided',
  SINGLE_TEXT_CHILD = 'must render correct structure if a single text child is provided',
  SINGLE_ELEMENT_CHILD = 'must render correct structure if a single element child is provided',
  MULTIPLE_ELEMENT_CHILDREN = 'must render correct structure if multiple element children are provided',
  TEXT_AND_ELEMENT_CHILDREN = 'must render correct structure if text and element children are provided',
  STYLE_RULES = 'must render necessary style rules',
  STRUCTURE = 'must render correct structure'
}
