import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../../assets/css/bootstrap-override.scss';
import '../../app/styles';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from '../../redux/configureStore';
import { getConfig } from '../../config';

import MaintenancePage from '../../pages/maintenance-page';

async function run() {
  render(
    <Provider store={configureStore(getConfig().store) as any}>
      <BrowserRouter>
        <MaintenancePage />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

run();

if ((module as any).hot) {
  (module as any).hot.accept();
}
