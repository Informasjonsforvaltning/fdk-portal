import styled from 'styled-components';
import UpperRightIllustration from '../../images/illustration-grey-upper-right.svg';
import LowerLeftIllustration from '../../images/illustration-grey-lower-left.svg';

const ErrorPage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-top: -4rem; //Hide breadcrumb margin
  margin-bottom: -60px; //Hide footer margin
`;

const UpperRightBackground = styled(UpperRightIllustration)`
  position: absolute;
  top: 0;
  right: 0;
  height: 300px;
`;

const LowerLeftBackground = styled(LowerLeftIllustration)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 300px;
`;

export default { ErrorPage, UpperRightBackground, LowerLeftBackground };
