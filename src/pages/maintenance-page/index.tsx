import React, { FC, useEffect } from 'react';

import { getConfig } from '../../config';
import localization from '../../lib/localization';

import { ConnectedAppNavBar } from '../../app/app-nav-bar/connected-app-nav-bar';

import SC from './styled';

const MaintenancePage: FC = () => {
  useEffect(() => {
    setTimeout(
      () => location.replace(getConfig().searchHost.host || 'https://fellesdatakatalog.digdir.no'),
      10000
    );
  }, []);

  const footerText = !getConfig().themeNap
    ? localization.footer.information_text
    : localization.footer.information_textNap;

  const footerEmail = !getConfig().themeNap
    ? localization.footer.mail
    : localization.footer.mailNap;

  return (
    <SC.MaintenancePage className="site theme-fdk">
      <ConnectedAppNavBar />
      <SC.PageContent className="container">
        <SC.Heading>Vi har flyttet!</SC.Heading>
        <SC.Subheading>
          <p>Felles Datakatalog har flyttet til Digitaliseringsdirektoratet.</p>
          <p>Du finner oss her:</p>
        </SC.Subheading>
        <SC.Link
          uri={getConfig().searchHost.host || 'https://fellesdatakatalog.digdir.no'}
          prefLabel="fellesdatakatalog.digdir.no"
        />
        <SC.RedirectionNotice>
          Du blir automatisk videresendt innen 10 sekunder.
        </SC.RedirectionNotice>
      </SC.PageContent>
      <div className="fdk-footer d-md-none">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center mb-2">
              <p className="fdk-p-footer">{footerText}</p>
            </div>
            <div className="col-sm-12 text-center mb-2">
              <p className="fdk-p-footer">
                <a href="https://www.brreg.no/personvernerklaering/">
                  {localization.footer.information}
                  {localization.footer.privacy}
                  <i className="fa fa-external-link fdk-fa-right" />
                </a>
              </p>
            </div>

            <div className="col-sm-12 text-center mb-2">
              <p className="fdk-p-footer">
                <a href={`mailto:${footerEmail}`}>{footerEmail}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fdk-footer d-none d-md-block">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <p className="fdk-p-footer">
                <a href="https://www.brreg.no/personvernerklaering/">
                  {localization.footer.information}
                  <br />
                  {localization.footer.privacy}
                  <i className="fa fa-external-link fdk-fa-right" />
                </a>
              </p>
            </div>
            <div className="col-md-6 text-center">
              <span className="uu-invisible" aria-hidden="false">
                Felles Datakatalog.
              </span>
              <p className="fdk-p-footer">{footerText}</p>
            </div>
            <div className="col-md-3 text-right">
              <p className="fdk-p-footer">
                <a href={`mailto:${footerEmail}`}>
                  <span className="uu-invisible" aria-hidden="false">
                    Mailadresse.
                  </span>
                  {localization.footer.contact}
                  <br />
                  {footerEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SC.MaintenancePage>
  );
};

export default MaintenancePage;
