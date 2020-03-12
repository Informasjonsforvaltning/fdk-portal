import { cleanup } from '@testing-library/react';

import { themeFDK as theme } from '../../../../../app/theme';

import {
  Expectation,
  renderWithTheme,
  expectCorrectRootElement,
  expectNoChildren,
  expectSingleTextChild,
  expectSingleElementChild,
  expectMultipleElementChildren,
  expectTextAndElementChildren,
  expectStyleRules
} from '../../../../../../test/utils';

import SC from '../styled';

afterEach(cleanup);

describe('Styled components for Detail component', () => {
  describe('SC.Detail component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.Detail, 'div');
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.Detail);
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.Detail);
    });

    it(Expectation.SINGLE_ELEMENT_CHILD, () => {
      expectSingleElementChild(SC.Detail);
    });

    it(Expectation.MULTIPLE_ELEMENT_CHILDREN, () => {
      expectMultipleElementChildren(SC.Detail);
    });

    it(Expectation.TEXT_AND_ELEMENT_CHILDREN, () => {
      expectTextAndElementChildren(SC.Detail);
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(SC.Detail, [
        { property: 'padding', value: '10px 0' },
        { property: 'border-top', value: '1px solid #dfe1e2' }
      ]);
    });
  });

  describe('SC.Property component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.Property, 'div', renderWithTheme, { theme });
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.Property, true, renderWithTheme, { theme });
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.Property, renderWithTheme, { theme });
    });

    it(Expectation.SINGLE_ELEMENT_CHILD, () => {
      expectSingleElementChild(SC.Property, renderWithTheme, { theme });
    });

    it(Expectation.MULTIPLE_ELEMENT_CHILDREN, () => {
      expectMultipleElementChildren(SC.Property, renderWithTheme, { theme });
    });

    it(Expectation.TEXT_AND_ELEMENT_CHILDREN, () => {
      expectTextAndElementChildren(SC.Property, renderWithTheme, { theme });
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(
        SC.Property,
        [
          { property: 'flex-basis', value: '30%' },
          { property: 'font-weight', value: 'bold' },
          { property: 'color', value: theme.colors.textDefault }
        ],
        renderWithTheme,
        { theme }
      );
    });
  });

  describe('SC.Value component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.Value, 'div');
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.Value);
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.Value);
    });

    it(Expectation.SINGLE_ELEMENT_CHILD, () => {
      expectSingleElementChild(SC.Value);
    });

    it(Expectation.MULTIPLE_ELEMENT_CHILDREN, () => {
      expectMultipleElementChildren(SC.Value);
    });

    it(Expectation.TEXT_AND_ELEMENT_CHILDREN, () => {
      expectTextAndElementChildren(SC.Value);
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(SC.Value, [{ property: 'flex-basis', value: '70%' }]);
    });
  });
});
