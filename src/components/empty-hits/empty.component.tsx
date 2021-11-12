import React, { FC, memo } from 'react';

import Link from '@fellesdatakatalog/link';
import SC from './styled';
import IllustrationNoHit from '../../images/illustration-no-hit.svg';
import localization from '../../lib/localization';
import env from '../../env';

const { FDK_COMMUNITY_BASE_URI } = env;

const EmptyHits: FC = () => (
  <SC.Content>
    <IllustrationNoHit />
    <SC.Header>{localization.hitstats.nohits}</SC.Header>
    <span>{localization.hitstats.nohitsDescription}</span>
    <span>
      {localization.hitstats.nohitsCommunityText}{' '}
      <Link href={FDK_COMMUNITY_BASE_URI}>
        {localization.hitstats.nohitsCommunityLink}
      </Link>
    </span>
  </SC.Content>
);

export default memo(EmptyHits);
