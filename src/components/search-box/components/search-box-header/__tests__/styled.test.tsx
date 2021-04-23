import { cleanup } from '@testing-library/react';

import {
  Expectation,
  expectCorrectRootElement,
  expectNoChildren,
  expectSingleTextChild,
  expectStyleRules
} from '../../../../../../test/utils';

import SC from '../styled';

afterEach(cleanup);

describe('Styled components for SearchBoxTitle component', () => {
  describe('SC.SearchBoxHeader component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.SearchBoxHeader, 'h1');
    });

    it(Expectation.NO_CHILDREN, () => {
      expectNoChildren(SC.SearchBoxHeader);
    });

    it(Expectation.SINGLE_TEXT_CHILD, () => {
      expectSingleTextChild(SC.SearchBoxHeader);
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(SC.SearchBoxHeader, [
        { property: 'font-size', value: '1.5em' },
        { property: 'font-weight', value: '500' }
      ]);
    });
  });
});
