import styled from 'styled-components';
import { Unit, theme as themeFDK } from '@fellesdatakatalog/theme';
import parentStyledComponents from '../styled';

const InfoIcon = styled.span`
  width: 55px;

  &:nth-of-type(n + 2) {
    margin-left: 1.5em;
  }
`;

const CategoryBox = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  color: #000 !important;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5em;
  padding: 0.5em 1.5em;
  text-decoration: none;

  & ${parentStyledComponents.Title} {
    font-size: ${themeFDK.fontSize('FS20', Unit.REM)};
    font-weight: 550;
  }

  & ${parentStyledComponents.CountTag} {
    font-weight: 700;
  }
`;

const OrgBox = styled(parentStyledComponents.Box)`
  & ${parentStyledComponents.Title} {
    padding-left: 1.5em;
  }
`;

export default {
  InfoIcon,
  CategoryBox,
  OrgBox,
  ...parentStyledComponents
};
