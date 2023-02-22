import '../../assets/designsystemet/scss/helper.scss';
import '../../assets/designsystemet/scss/portal.scss';
import '../../assets/designsystemet/scss/typo.scss';
import '../../assets/designsystemet/scss/common.scss';
import '../../assets/designsystemet/scss/animations.scss';
import '../../assets/designsystemet/scss/colors.scss';
import '../../assets/fonts/icomoon.css';

import { createGlobalStyle } from 'styled-components';

import CommonStyles from './common';

export default createGlobalStyle`
  ${CommonStyles}
`;
