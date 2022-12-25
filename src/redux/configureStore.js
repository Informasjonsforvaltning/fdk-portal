import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import { apiMiddleware } from 'redux-api-middleware';
import { commentsApi } from '../api/user-feedback-api/comments';

import { rootReducer } from './rootReducer';
import RootSaga from './saga';

import LoggingService from '../services/logging';

const sagaMiddleware = createSagaMiddleware({
  context: { logging: LoggingService }
});

export function configureStore(storeConfig) {
  const middlewares = [
    thunk,
    apiMiddleware,
    sagaMiddleware,
    commentsApi.middleware
  ];
  if (storeConfig.reduxLog) {
    middlewares.push(createLogger());
  }

  const enhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    persistState(['featureToggle', 'settings'], { key: 'redux' })
  );

  const store = createStore(rootReducer, /* preloadedState, */ enhancer);
  store.dispatch({ type: 'STORE_INIT' });

  sagaMiddleware.run(RootSaga);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      store.replaceReducer(require('./rootReducer').rootReducer);
    });
  }

  return store;
}
