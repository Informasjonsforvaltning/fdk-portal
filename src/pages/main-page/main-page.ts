import { compose } from 'redux';

import MainPagePure from './main-page-pure';
import withEntities from '../../components/with-entities';
import withReferenceData from '../../components/with-reference-data';
import { mainPageResolver } from './main-page-resolver';

const enhance = compose(mainPageResolver, withEntities, withReferenceData);

export const MainPage = enhance(MainPagePure);
