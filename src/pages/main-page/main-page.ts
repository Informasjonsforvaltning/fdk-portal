import { compose } from 'redux';

import MainPagePure from './main-page-pure';
import withEntities from '../../components/with-entities';
import withReferenceData from '../../components/with-reference-data';

const enhance = compose(withEntities, withReferenceData);

export const MainPage = enhance(MainPagePure);
