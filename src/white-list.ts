/**
 * This file contains a list of resources that can have a button to let the user request the data.
 * The requestAdress field is the application form adress for requestsing access to the data,
 * and the id is the id of the specific resource.
 */

import { AccessRequest } from './types';

export const accessRequestWhiteList: AccessRequest[] = [
  // Staging
  {
    id: '788dc86c-7e14-3a52-8f9e-2808001fbf44',
    requestAddress: 'https://digdir.apps.tt02.altinn.no/digdir/tilgangssoknad/'
  },
  {
    id: '86e664de-e8b4-355a-bdec-56724eb07900',
    requestAddress:
      'https://digdir.apps.tt02.altinn.no/digdir/tilgangsoknad-svv/'
  },
  {
    id: '8f305377-a3a3-3dde-be33-d5b5d0b8f818',
    requestAddress: 'https://forms.gle/VnBnZwvsWSu51a3V6'
  },
  // Production
  {
    id: 'a49ddd4a-8ccf-3054-8164-0bb9bfc9783c',
    requestAddress: 'https://digdir.apps.altinn.no/digdir/tilgangssoknad/'
  },
  {
    id: 'e281c8c6-b944-4662-861d-a475e973e393',
    requestAddress: 'https://www.skatteetaten.no/deling/folkeregisteret/intro/'
  },
  {
    id: '95b9c74d-1dd4-3f92-aef2-a6a587b03fb3',
    requestAddress: 'https://digdir.apps.altinn.no/digdir/tilgangssoknad-tenor/'
  }
];
