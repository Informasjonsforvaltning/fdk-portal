import React from 'react';
import { KeyValueListItem } from '../../../../components/details-page';
import translations from '../../../../lib/localization';

interface Props {
  memberOf: string[];
}

const MemberOf = ({ memberOf }: Props) => (
  <KeyValueListItem
    key={`${translations.conceptReferences.memberOf}`}
    property={`${translations.conceptReferences.memberOf}`}
    value={memberOf.map(uri => (
      <p>{uri}</p>
    ))}
  />
);

export default MemberOf;
