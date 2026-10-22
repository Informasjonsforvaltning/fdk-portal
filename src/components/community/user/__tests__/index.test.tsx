/**
 * @jest-environment jsdom
 */
import React from 'react';
import { DefaultTheme as theme } from '@fellesdatakatalog/theme';
import env from '../../../../env';
import type { CommunityUser } from '../../../../types';
import { renderWithTheme } from '../../../../../test/utils';

import User from '..';

const user: CommunityUser = {
  uid: '1',
  username: 'example-user',
  displayname: 'Example User',
  fullname: 'Example User',
  userslug: 'example-user',
  reputation: 0,
  postcount: 1,
  banned: 0,
  status: 'offline',
  'icon:text': 'E',
  'icon:bgColor': '#000000',
  banned_until_readable: ''
};

const { FDK_COMMUNITY_BASE_URI } = env;

describe('Community User component', () => {
  it('marks the profile picture as decorative and keeps the named profile link', () => {
    const picture = '/assets/uploads/profile/1-profile.png';
    const { getByRole } = renderWithTheme(
      <User user={{ ...user, picture }} />,
      { theme }
    );

    const link = getByRole('link', { name: user.displayname });
    const image = link.querySelector('img');

    expect(image).toHaveAttribute('src', `${FDK_COMMUNITY_BASE_URI}${picture}`);
    expect(image).toHaveAttribute('alt', '');
    expect(link).toHaveAttribute(
      'href',
      `${FDK_COMMUNITY_BASE_URI}/user/${user.userslug}`
    );
  });

  it('keeps the initial and profile link for users without a picture', () => {
    const { getByRole, getByText, container } = renderWithTheme(
      <User user={user} />,
      { theme }
    );

    const link = getByRole('link');

    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(link).toContainElement(getByText(user['icon:text']));
    expect(link).toContainElement(getByText(user.displayname));
    expect(link).toHaveAttribute(
      'href',
      `${FDK_COMMUNITY_BASE_URI}/user/${user.userslug}`
    );
  });
});
