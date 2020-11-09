import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Root = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 80px;
  width: 1140px;
  margin: 0 auto;

  @media (max-width: 1204px) {
    & {
      width: auto;
      margin: 0 ${theme.spacing('S32')};
    }
  }

  @media (max-width: 900px) {
    & {
      margin: 0 calc(12px + (32 - 12) * ((100vw - 320px) / (900 - 320)));
    }
  }
`;

export default { Root };
