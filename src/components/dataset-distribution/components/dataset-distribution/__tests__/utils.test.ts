import { formatSorter } from '../utils';

import { DataFormat } from '../../../../../types/enums';

describe('DatasetDistribution utils', () => {
  describe('formatSorter', () => {
    it('must correctly sort formats', () => {
      type Case = { input: DataFormat[]; expected: DataFormat[] };

      const cases: Case[] = [
        { input: [], expected: [] },
        {
          input: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.XML,
            DataFormat.JSON,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.JSON,
            DataFormat.UNKNOWN
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN,
            DataFormat.JSON
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.CSV,
            DataFormat.XML,
            DataFormat.UNKNOWN,
            DataFormat.JSON
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.CSV,
            DataFormat.UNKNOWN,
            DataFormat.XML,
            DataFormat.JSON
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.CSV,
            DataFormat.UNKNOWN,
            DataFormat.JSON,
            DataFormat.XML
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.UNKNOWN,
            DataFormat.CSV,
            DataFormat.JSON,
            DataFormat.XML
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.UNKNOWN,
            DataFormat.JSON,
            DataFormat.CSV,
            DataFormat.XML
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.UNKNOWN,
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.JSON,
            DataFormat.UNKNOWN,
            DataFormat.XML,
            DataFormat.CSV
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        },
        {
          input: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.UNKNOWN,
            DataFormat.CSV
          ],
          expected: [
            DataFormat.JSON,
            DataFormat.XML,
            DataFormat.CSV,
            DataFormat.UNKNOWN
          ]
        }
      ];

      cases.forEach(({ input, expected }) =>
        expect(input.sort(formatSorter)).toEqual(expected)
      );
    });
  });
});
