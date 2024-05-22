/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

import { MonsidoError } from './errors';
import { getEnvironment } from './helpers';

export const MonsidoTrackEventParams = {
  Action: {
    Click: {
      Button: {
        AccessRequest: `${getEnvironment()}Access request button`
      }
    }
  },
  Category: {
    ClickTracking: `${getEnvironment()}ClickTracking`
  },
  Event: {
    ButtonClicked: `${getEnvironment()}ButtonClickEvent`
  },
  IncreaseCountBy: 1
};

export const monsidoTrackButtonClickEvent = (action: string) => {
  if (window.monsido_functions === undefined) {
    console.error(MonsidoError.MonsidoFunctionsNotDefined);
    return null;
  }
  if (
    !Object.values(MonsidoTrackEventParams.Action.Click.Button).includes(action)
  ) {
    console.error(MonsidoError.UnknownAction);
    return null;
  }
  return window.monsido_functions.trackEvent(
    MonsidoTrackEventParams.Category.ClickTracking,
    action,
    MonsidoTrackEventParams.Event.ButtonClicked,
    MonsidoTrackEventParams.IncreaseCountBy
  );
};
