import styled from 'styled-components';
import parentStyledComponents from '../styled';

const InfoIcon = styled.span`
  display: flex;
  flex-direction: row;
  align-items: end;
  color: #fff;
  background-color: transparent;
  border: none;
  width: 50px;

  &:nth-of-type(n + 2) {
    margin-left: 1.5em;
  }

  &:hover > svg > path {
    fill: #fff;
  }
`;

const CategoryBox = styled(parentStyledComponents.Box)`
  & ${parentStyledComponents.Title} {
    font-weight: 550;
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
