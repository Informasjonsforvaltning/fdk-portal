import React, { FC, memo } from 'react';

import SC from './styled';
import IllustrationNoHit from '../../images/illustration-no-hit.svg';
import localization from '../../lib/localization';

const EmptyHits: FC = () => (
  <SC.Content>
    <IllustrationNoHit />
    <SC.Header>{localization.hitstats.nohits}</SC.Header>
    <span>{localization.hitstats.nohitsDescription}</span>
  </SC.Content>
);

export default memo(EmptyHits);
