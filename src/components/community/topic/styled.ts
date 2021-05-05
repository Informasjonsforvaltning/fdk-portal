import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Topic = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px 0px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  & h3 {
    display: inline-block;
    font-weight: ${theme.fontWeight('FW500')};
    color: ${({ theme }) => theme.entityColours.dark};
    border-bottom: 1px solid;
    border-bottom-color: ${({ theme }) => theme.entityColours.dark};
    margin-bottom: 5px;

    &:hover {
      border-bottom: none;
    }
  }

  & > div > * {
    margin-right: 5px;
  }
`;

const Statistics = styled.ul`
  display: flex;
  list-style-type: none;

  & > li {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 5px;
  }

  @media (max-width: 990px) {
    display: none;
  } ;
`;

const BigNumber = styled.span`
  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS16')};
`;

export default { Topic, Info, Statistics, BigNumber };
