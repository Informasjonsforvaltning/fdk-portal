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

describe('Styled components for Summary component', () => {
  describe('SC.Summary component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.Summary, 'div');
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.Summary);
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.Summary);
    });

    it(Expectation.SINGLE_ELEMENT_CHILD, () => {
      expectSingleElementChild(SC.Summary);
    });

    it(Expectation.MULTIPLE_ELEMENT_CHILDREN, () => {
      expectMultipleElementChildren(SC.Summary);
    });

    it(Expectation.TEXT_AND_ELEMENT_CHILDREN, () => {
      expectTextAndElementChildren(SC.Summary);
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(SC.Summary, [
        { property: 'display', value: 'flex' },
        { property: 'justify-content', value: 'space-between' },
        { property: 'align-items', value: 'center' }
      ]);
    });
  });

  describe('SC.Title component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.Title, 'h4', renderWithTheme, { theme });
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.Title, true, renderWithTheme, { theme });
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.Title, renderWithTheme, { theme });
    });

    it(Expectation.SINGLE_ELEMENT_CHILD, () => {
      expectSingleElementChild(SC.Title, renderWithTheme, { theme });
    });

    it(Expectation.MULTIPLE_ELEMENT_CHILDREN, () => {
      expectMultipleElementChildren(SC.Title, renderWithTheme, { theme });
    });

    it(Expectation.TEXT_AND_ELEMENT_CHILDREN, () => {
      expectTextAndElementChildren(SC.Title, renderWithTheme, { theme });
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(
        SC.Title,
        [
          { property: 'font-size', value: '16px' },
          { property: 'color', value: theme.colors.textDefault },
          { property: 'white-space', value: 'nowrap' },
          { property: 'text-overflow', value: 'ellipsis' },
          { property: 'overflow', value: 'hidden' }
        ],
        renderWithTheme,
        { theme }
      );
    });
  });

  describe('SC.Formats component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.Formats, 'div');
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.Formats);
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.Formats);
    });

    it(Expectation.SINGLE_ELEMENT_CHILD, () => {
      expectSingleElementChild(SC.Formats);
    });

    it(Expectation.MULTIPLE_ELEMENT_CHILDREN, () => {
      expectMultipleElementChildren(SC.Formats);
    });

    it(Expectation.TEXT_AND_ELEMENT_CHILDREN, () => {
      expectTextAndElementChildren(SC.Formats);
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(SC.Formats, [
        { property: 'margin-left', value: '12px' }
      ]);
    });
  });

  describe('SC.Format component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.Format, 'div');
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.Format);
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.Format);
    });

    it(Expectation.SINGLE_ELEMENT_CHILD, () => {
      expectSingleElementChild(SC.Format);
    });

    it(Expectation.MULTIPLE_ELEMENT_CHILDREN, () => {
      expectMultipleElementChildren(SC.Format);
    });

    it(Expectation.TEXT_AND_ELEMENT_CHILDREN, () => {
      expectTextAndElementChildren(SC.Format);
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(SC.Format, [
        {
          property: 'margin-left',
          value: '8px',
          options: { modifier: '&:nth-of-type(n + 2)' }
        },
        {
          property: 'height',
          value: '40px',
          options: { modifier: '& > svg' }
        },
        {
          property: 'width',
          value: '40px',
          options: { modifier: '& > svg' }
        }
      ]);
    });
  });
});
