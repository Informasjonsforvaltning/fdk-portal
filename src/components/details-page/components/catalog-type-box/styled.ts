import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 768px)';

const CatalogTypeBox = styled.div`
  align-items: flex-start;
  background-color: ${({ theme: t }) => t.entityColours.light};
  border-radius: 5px;
  display: flex;
  gap: ${theme.spacing('S10')};
  padding: ${theme.spacing('S12')};

  & svg > path {
    fill: ${({ theme: t }) => t.entityColours.dark};
  }

  & > svg {
    width: 20px;
    min-width: 20px;

    ${onMobileView} {
      width: 20px;
      min-width: 20px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  & > a {
    color: ${({ theme: t }) => t.entityColours.dark} !important;
  }
`;

export default { CatalogTypeBox, Content };
