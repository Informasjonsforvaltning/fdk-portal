import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Relation = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.entityColours.light};
  & :last-of-type {
    border-bottom: none;
  }
`;

const RelationLinks = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: ${theme.spacing('S4')};
  margin-left: 35px;

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
    margin-left: 10px;
    font-size: ${theme.fontSize('FS16')};
    font-weight: ${theme.fontWeight('FW500')};
  }
`;

const IconBackground = styled.span`
  display: flex;
  padding: 5px;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  background-color: ${({ theme }) => theme.entityColours.light};

  & path {
    fill: ${({ theme }) => theme.entityColours.dark};
    color: ${({ theme }) => theme.entityColours.dark};
  }
`;

export default { Relation, RelationLinks, Banner, IconBackground };
