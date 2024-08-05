import styled from 'styled-components';
import { Unit, theme } from '@fellesdatakatalog/theme';

const Relation = styled.div`
  border-bottom: 1px solid ${({ theme: t }) => t.entityColours.light};
  & :last-of-type {
    border-bottom: none;
  }
`;

const RelationLinks = styled.ul`
  display: flex;
  flex-direction: column;

  margin-bottom: ${theme.spacing('S4')};

  & a {
    margin-top: ${theme.spacing('S4')};
    margin-right: ${theme.spacing('S8')};
  }

  & :last-child {
    margin-bottom: ${theme.spacing('S8')};
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${theme.spacing('S8')};

  & > h3 {
    font-size: ${theme.fontSize('FS16', Unit.REM)};
    font-weight: bold;
  }
`;

export default { Relation, RelationLinks, Banner };
