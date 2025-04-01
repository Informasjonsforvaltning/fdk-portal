import React, { FC } from 'react';

import env from '../../../env';

import SC from './styled';

import type { CommunityUser } from '../../../types';
import translations from '../../../lib/localization';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  user: CommunityUser;
}

const Username = ({ user }: { user: CommunityUser }) => {
  const name = user.displayname ?? user.username;
  return name.includes('former-user')
    ? translations.community.formerUser
    : name;
};

const User: FC<Props> = ({ user }) => (
  <SC.User href={`${FDK_COMMUNITY_BASE_URI}/user/${user.userslug}`}>
    {user.picture ? (
      <SC.Picture src={`${FDK_COMMUNITY_BASE_URI}${user.picture}`} />
    ) : (
      <SC.Icon colour={user['icon:bgColor']}>{user['icon:text']}</SC.Icon>
    )}

    <SC.Name>
      <Username user={user} />
    </SC.Name>
  </SC.User>
);

export default User;
