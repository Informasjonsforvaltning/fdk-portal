import React from 'react';
import DocumentMeta from 'react-document-meta';

import localization from '../../lib/localization';
import './article-page.scss';

export const ArticlePage = () => {
  const meta = {
    title: 'Hvordan få tilgang til dine kataloger'
  };
  return (
    <div className="container">
      <DocumentMeta {...meta} />
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <h1 className="title">{localization.registration.title}</h1>

          <div className="fdk-box fdk-box--white">
            <p>
              Her finner du katalogene til din virksomhet i Felles datakatalog:{' '}
              <a
                title="Lenke til Altinn"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.altinn.no/"
              >
                https://registrering.fellesdatakatalog.digdir.no
              </a>
            </p>
            <p>
              For å se og redigere innhold må du være innlogget. Du kan velge
              mellom to innloggingsmetoder:
              <ul>
                <li>Innlogging med ID-porten/Altinn</li>
                <li>Innlogging med Felles brukerhåndtering</li>
              </ul>
            </p>
            <div className="fdk-subtitle">Innlogging med ID-porten/Altinn</div>
            <p>
              Din leder må gi deg tilgang til tjenesten &quot;Registrering i
              datakatalog&quot; i Altinn, og eventuelt tildele deg rollen
              &quot;Tilgangsstyring&quot;, dersom du skal delegere tilgangen
              videre.
              <br />
              <br />
              Kontakt den som kan delegere tilganger i Altinn i din virksomhet.
              <br />
              <br />
              Når du har fått tilgang, vil din virksomhets kataloger være
              tilgjengelig etter innlogging.
              <br />
              <br />
              Det er også mulig at din virksomhet kan få registrere på vegne av
              andre. Dersom du ønsker dette, må du kontakte FDK på:{' '}
              <a href="mailto:fellesdatakatalog@digdir.no">
                fellesdatakatalog@digdir.no
              </a>
              <br />
              <br />
            </p>
            <div className="fdk-subtitle">
              Innlogging med Felles brukerhåndtering
            </div>
            <p>
              Du kan selv opprette bruker ved å registrere deg på
              Digitaliseringsdirektoratets Felles brukerhåndtering. Vi bruker
              e-postadressen til å identifisere deg og knytte deg til rett
              organisasjon. Bruk derfor jobb-adressen din når du logger på.
              <br />
              <br />
              Du vil motta en e-post fra Felles brukerhåndtering etter
              registering. Følg instruksen i e-posten.
              <br />
              <br />
              Etter å ha fullført innlogging, vil din virksomhets kataloger være
              tilgjengelige.
              <br />
              <br />
            </p>
            <div className="fdk-subtitle">Bruksvilkår</div>
            <p>
              Etter innlogging må du (eller en annen bemyndiget person i din
              virksomhet) akseptere bruksvilkår på vegne av virksomheten. Hvis
              de ikke aksepteres, vil det ikke opprettes kataloger for din
              virksomhet.
            </p>
          </div>

          <div className="fdk-subtitle">
            Veiledning for å få tilgang gjennom Altinn
          </div>

          <div className="fdk-subtitle-2">
            Hvordan gjøre en ansatt til ansvarlig for registrering i Felles
            datakatalog (FDK) - Anbefalt
          </div>

          <div className="fdk-box fdk-box--yellow fdk-box--flex fdk-box--noMargin">
            <i className="fdk-box__icon fa fa-exclamation-circle fa-3x" />

            <div>
              Du må ha rollen <strong>Tilgangsstyring</strong> for din
              virksomhet for å tildele roller og rettigheter til andre.
              <br />
              Du trenger <strong>fødselsnummer</strong> (11 siffer) og{' '}
              <strong>etternavnet</strong> til den du ønsker å tildele
              rettigheter til.
            </div>
          </div>

          <div className="fdk-box fdk-box--white fdk-box--border">
            <p>
              Den som er ansvarlig for registrering i FDK vil ha ansvaret for å
              gi ansatte tilgang til å registrere i FDK på vegne av
              virksomheten. Det er anbefalt at dere har en person med dette
              ansvaret, da det forenkler fremtidige tilganger.
            </p>
            <p>
              <strong>Slik går du frem:</strong>
            </p>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">1</div>
              <div className="fdk-box__rowItem__text">
                Logg inn i{' '}
                <a
                  title="Lenke til Altinn"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.altinn.no/"
                >
                  Altinn
                </a>
                <div
                  dangerouslySetInnerHTML={{
                    __html: 'Velg aktøren du ønsker å representere<br />'
                  }}
                />
              </div>
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/img/image_choose_person.png" title="" />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">2</div>
              <div
                className="fdk-box__rowItem__text"
                dangerouslySetInnerHTML={{
                  __html: 'Velg "profil" øverst på siden'
                }}
              />
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/img/image_choose_profile.png" title="" />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">3</div>
              <div className="fdk-box__rowItem__text">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      'Under "Andre med rettigheter til virksomheten" kan du legge til en <strong>ny person.</strong>'
                  }}
                />
                <div className="fdk-box fdk-box--yellow fdk-box--italic">
                  Husk at du trenger fødselsnummer og etternavnet til den du
                  ønsker å legge til.
                </div>
              </div>
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/img/image_add_new_person.png" title="" />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">4</div>
              <div className="fdk-box__rowItem__text">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      'Her tildeler du <strong>rolle</strong> til den ansatte. <br />Legg til rollen <strong>Tilgangsstyring</strong>.'
                  }}
                />
                <p>
                  Tilgangsstyring gir deg muligheten til å gi andre ansatte
                  tilgang til registreringsløsningen i fremtiden.
                </p>
              </div>
              <div className="fdk-box__rowItem--big">
                <img
                  alt=""
                  src="/img/image_give_and_remove_rights.png"
                  title=""
                />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">5</div>
              <div className="fdk-box__rowItem__text">
                <p>
                  Tildel <strong>rettighetene</strong> den ansatte skal ha.
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      'Søk etter <strong>"Registrering i datakatalog"</strong> og gi følgende rettigheter: <br />- Lese <br />- Fylle ut <br />- Signere <br />- Les arkiv <br /><br />Deretter trykker du "Ferdig".'
                  }}
                />
              </div>
              <div className="fdk-box__rowItem--big">
                <img
                  alt=""
                  src="/img/image_give_and_remove_rights_confirmation.png"
                  title=""
                />
              </div>
            </div>

            <div className="text-center">
              <span>
                Gratulerer! Nå har du opprettet en ansvarlig for registrering i
                FDK for din virksomhet.
              </span>
            </div>
          </div>

          <div className="fdk-subtitle-2">
            <span>
              Jeg &oslash;nsker å tildele rettigheter til enkeltpersoner manuelt
            </span>
          </div>

          <div className="fdk-box fdk-box--white">
            <p>
              Vi anbefaler at dere bruker en ansvarlig for registrering i FDK
              som administrerer registreringsrettigheter for virksomheten. Dette
              er forklart over.
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  'Dersom du allikevel ønsker å tildele rettigheter enkeltvis, følger du stegene som beskrevet over, <strong>unntatt steg 4</strong>, hvor du tildeler rollen "Tilgangsstyring".'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
