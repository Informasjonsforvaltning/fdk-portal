/**
 * @jest-environment jsdom
 */
import { cleanup } from '@testing-library/react';

import { SC as ExpansionPanelSC } from '@fellesdatakatalog/expansion-panel';

import { themeFDK as theme } from '../../../../../app/theme';

import {
  Expectation,
  expectCorrectRootElement,
  expectStyleRules,
  renderWithTheme
} from '../../../../../../test/utils';

import SC from '../styled';

afterEach(cleanup);

describe('Styled components for DatasetDistribution component', () => {
  describe('SC.DatasetDistribution component', () => {
    it(Expectation.ROOT_ELEMENT, () => {
      expectCorrectRootElement(SC.DatasetDistribution, 'div', renderWithTheme, {
        theme
      });
    });

    it(Expectation.STYLE_RULES, () => {
      expectStyleRules(
        SC.DatasetDistribution,
        [
          { property: 'border-radius', value: '5px' },
          { property: 'overflow', value: 'hidden' },
          {
            property: 'margin-top',
            value: '10px',
            options: { modifier: '&:nth-of-type(n + 2)' }
          },
          {
            property: 'padding',
            value: '1em 2em',
            options: { modifier: `& > ${ExpansionPanelSC.ExpansionPanel.Head}` }
          },
          {
            property: 'min-width',
            value: '0',
            options: {
              modifier: `& > ${ExpansionPanelSC.ExpansionPanel.Head} > ${ExpansionPanelSC.ExpansionPanel.HeadContent}`
            }
          },
          {
            property: 'margin-left',
            value: '24px',
            options: {
              modifier: `& > ${ExpansionPanelSC.ExpansionPanel.Head} > ${ExpansionPanelSC.ExpansionPanel.HeadExpansionIndicator}`
            }
          },
          {
            property: 'padding',
            value: '0px 24px 12px',
            options: { modifier: `& > ${ExpansionPanelSC.ExpansionPanel.Body}` }
          }
        ],
        renderWithTheme,
        { theme }
      );
    });
  });
});
