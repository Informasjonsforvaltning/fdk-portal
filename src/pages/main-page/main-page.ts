import { compose } from 'redux';

import MainPagePure from './main-page-pure';
import withEntities from '../../components/with-entities';
import withReferenceData from '../../components/with-reference-data';
import withCommunity from '../../components/with-community';
import { mainPageResolver } from './main-page-resolver';

const enhance = compose(
  mainPageResolver,
  withEntities,
  withReferenceData,
  withCommunity
);

export const MainPage = enhance(MainPagePure);
