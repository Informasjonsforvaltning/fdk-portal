import { all } from 'redux-saga/effects';

import cmsArticleSaga from '../../../../components/with-cms-article/redux/saga';

export default function* saga() {
  yield all([cmsArticleSaga()]);
}
