import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

import ContentSectionSC from '../content-section/styled';

const Aside = styled.aside`
  display: flex;
  flex: 0 0 25%;
  flex-direction: column;
  gap: ${theme.spacing('S10')};

  & > ${ContentSectionSC.ContentSection} {
    padding: ${theme.spacing('S16')};
  }
`;

export default { Aside };
