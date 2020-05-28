import { connect } from 'react-redux';
import { App } from './app';
import { setLanguageAction } from '../redux/modules/settings';

const mapStateToProps = state => ({
  // react-localization module designed to be stateful, so we have to re-render the app when the selected language is changed
  language: state.settings.language
});

const mapDispatchToProps = dispatch => ({
  onChangeLanguage: language => dispatch(setLanguageAction(language))
});

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
