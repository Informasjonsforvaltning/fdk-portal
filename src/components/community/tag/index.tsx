import React, { FC } from 'react';

import SC from './styled';

import type { CommunityTag } from '../../../types';
import env from '../../../env';

const { FDK_COMMUNITY_BASE_URI } = env;

const Tag: FC<CommunityTag> = ({ value, valueEscaped }) => (
  <a href={`${FDK_COMMUNITY_BASE_URI}tags/${valueEscaped}`}>
    <SC.Tag>{value}</SC.Tag>
  </a>
);

export default Tag;
