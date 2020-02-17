import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import 'jest-styled-components';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
