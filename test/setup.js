import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import 'jest-styled-components';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
