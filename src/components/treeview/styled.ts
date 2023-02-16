import styled from 'styled-components';
import ChevronUpIconBase from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';

const CollapseButton = styled.button`
  border: none;
  background: transparent;

  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }
`;

const ChevronUpIcon = styled(ChevronUpIconBase)`
  width: 16px;
  height: 16px;
`;

export default { CollapseButton, ChevronUpIcon };
