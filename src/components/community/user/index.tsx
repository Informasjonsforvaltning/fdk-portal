import React, { FC } from 'react';

import env from '../../../env';

import SC from './styled';

import type { CommunityUser } from '../../../types';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  user: CommunityUser;
}

const User: FC<Props> = ({ user }) => (
  <SC.User href={`${FDK_COMMUNITY_BASE_URI}/user/${user.userslug}`}>
    {user.picture ? (
      <SC.Picture src={`${FDK_COMMUNITY_BASE_URI}${user.picture}`} />
    ) : (
      <SC.Icon colour={user['icon:bgColor']}>{user['icon:text']}</SC.Icon>
    )}

    <SC.Name colour={user['icon:bgColor']}>
      {user.displayname ?? user.username}
    </SC.Name>
  </SC.User>
);

export default User;
