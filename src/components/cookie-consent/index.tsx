import React, { FC, useEffect, useState } from 'react';
import Button from '@fellesdatakatalog/button';
import Link from '@fellesdatakatalog/link';

import localization from '../../lib/localization';
import {
  CONSENT_OPEN_EVENT,
  hasConsentDecision,
  saveConsent
} from '../../lib/consent';

import SC from './styled';

const COOKIE_POLICY_URL =
  'https://www.digdir.no/om-oss/informasjonskapsler/707';

const CookieConsent: FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show on first visit (no decision yet); reopen when triggered from a footer link.
    setOpen(!hasConsentDecision());

    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  if (!open) {
    return null;
  }

  const t = localization.cookieConsent;

  const decide = (statistics: boolean) => {
    saveConsent(statistics);
    setOpen(false);
  };

  return (
    <SC.Banner role='region' aria-label={t.heading}>
      <SC.Inner>
        <SC.Heading>{t.heading}</SC.Heading>
        <SC.Text>
          {t.description} <Link href={COOKIE_POLICY_URL}>{t.readMore}</Link>
        </SC.Text>
        <SC.Text>{t.necessaryNote}</SC.Text>
        <SC.Actions>
          <Button onClick={() => decide(true)}>{t.accept}</Button>
          <Button onClick={() => decide(false)}>{t.reject}</Button>
        </SC.Actions>
      </SC.Inner>
    </SC.Banner>
  );
};

export default CookieConsent;
