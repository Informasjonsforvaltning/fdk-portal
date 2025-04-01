import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';
import Scroll from 'react-scroll';

const ModelDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionField = styled.div`
  display: flex;

  &:nth-of-type(n + 2) {
    margin-top: ${theme.spacing('S4')};
  }

  & > :first-child {
    flex: 0 0 25%;
  }
`;

const Link = styled(LinkBase)`
  color: ${({ theme: t }) => t.extendedColors.neutralDarkest};
`;

const ScrollLink = styled(Scroll.Link)`
  color: ${({ theme: t }) => t.extendedColors.neutralDarkest};
`;

export default { ModelDescription, DescriptionField, Link, ScrollLink };
