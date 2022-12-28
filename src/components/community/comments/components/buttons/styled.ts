import styled from 'styled-components';
import Button from '@fellesdatakatalog/button';

const BigButton = styled(Button)`
  background-color: ${({ theme: t }) => t.entityColours.dark};
  &:hover {
    color: ${({ theme: t }) => t.entityColours.dark};
    background-color: ${({ theme: t }) => t.entityColours.light};
    & path {
      stroke: ${({ theme: t }) => t.entityColours.dark};
    }
  }

  &:focus {
    background-color: ${({ theme: t }) => t.entityColours.dark};
    outline-width: 1px;
    outline-color: ${({ theme: t }) => t.entityColours.dark};
    outline-style: dashed;
  }
`;

const UnderlineButton = styled(Button)`
  white-space: nowrap;
  border-bottom: 2px solid ${({ theme: t }) => t.entityColours.dark};

  & path {
    stroke: ${({ theme: t }) => t.entityColours.dark};
  }

  &:hover {
    border-bottom: 2px solid transparent;
  }
`;

export default {
  BigButton,
  UnderlineButton
};
