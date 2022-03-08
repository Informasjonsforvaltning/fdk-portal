import React, { FC, memo } from 'react';
import { compose } from 'redux';
import { Variant } from '@fellesdatakatalog/button';

import SC from './styled';
import { useGetUserQuery } from '../../../../../api/user-feedback-api/comments';
import { withAuth, Props as AuthProps } from '../../../../../providers/auth';
import translations from '../../../../../lib/localization';
import Buttons from '../buttons/styled';

const LogOut: FC<AuthProps> = ({ authService }) => {
  const { data: currentUser } = useGetUserQuery();

  return (
    <SC.LogOutContainer>
      {translations.community.comments.session + currentUser?.username} &bull;{' '}
      <Buttons.UnderlineButton
        variant={Variant.TERTIARY}
        onClick={() => authService.signOut()}
      >
        {translations.community.comments.buttons.logOutFeedback}
      </Buttons.UnderlineButton>
    </SC.LogOutContainer>
  );
};

export default compose<FC>(memo, withAuth)(LogOut);
