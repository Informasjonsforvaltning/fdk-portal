import styled from 'styled-components';
import Button from '@fellesdatakatalog/button';

const BigButton = styled(Button)`
  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }
`;

const UnderlineButton = styled(Button)`
  white-space: nowrap;
  border-bottom: 2px solid ${({ theme }) => theme.extendedColors.neutralDarkest};

  & path {
    stroke: ${({ theme }) => theme.extendedColors.neutralDarkest};
  }

  &:hover {
    border-bottom: 2px solid transparent;
  }

  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }
`;

export default {
  BigButton,
  UnderlineButton
};
