import styled from 'styled-components';
import { Unit, theme } from '@fellesdatakatalog/theme';
import { Link } from 'react-router-dom';

// const onMobileView = '@media (max-width: 768px)';

const CompareList = styled.div`
  margin: ${theme.spacing('S16')} 0;
`;

const BoxHeader = styled.h3`
  margin-bottom: ${theme.spacing('S10')};
  font-size: ${theme.fontSize('FS20', Unit.REM)};
  font-weight: ${theme.fontWeight('FW500')};
`;

const CompareLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

export default {
  CompareList,
  BoxHeader,
  CompareLink
};
