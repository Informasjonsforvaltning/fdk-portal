import styled, { keyframes } from 'styled-components';
import SpinnerImage from '../../images/spinner-digdir-fdk.svg';

const spinnerKeyframes = keyframes`
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.825, 0.005, 0.235, 1);
    }
    50% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.72, 0.005, 0.26, 1);
    }
    100% {
      transform: rotate(0deg);
    }`;

const Spinner = styled(SpinnerImage)`
  width: 120px;
  height: 120px;
  transform: rotate(0deg);
  animation: ${spinnerKeyframes} 4000ms linear infinite normal forwards;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default { Spinner, SpinnerContainer };
