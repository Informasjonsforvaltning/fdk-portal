import { List, Map } from 'immutable';

import { getTranslateText as translate } from '../../../lib/translateText';

import { SortOrder } from '../../../types/enums';

export const sortOrganizations =
  (selector: string[], order: SortOrder = SortOrder.ASC) =>
  (organizations: List<any>) =>
    organizations.sortBy(
      (organization: Map<string, any>) =>
        organization.getIn(selector) ?? organization.get('name'),
      (a?: any, b?: any) =>
        (isNaN(a) && isNaN(b)
          ? translate(Map.isMap(a) ? a.toJS() : a)?.localeCompare(
              translate(Map.isMap(b) ? b.toJS() : b),
              'nb'
            ) ?? 0
          : a - b) * (order === SortOrder.ASC ? 1 : -1)
    );
