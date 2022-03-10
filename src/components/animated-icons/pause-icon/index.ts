import styled, { keyframes } from 'styled-components';
import PauseIconBase from '../../../images/pause-btn.inline.svg';

const topAnimation = keyframes`
  0% {
    transform: translate(8px, 6.75px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  20% {
    transform: translate(8px, 4.75px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  36% {
    transform: translate(8px, 5.75px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  52% {
    transform: translate(8px, 4.75px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  68% {
    transform: translate(8px, 5.75px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  84% {
    transform: translate(8px, 4.75px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  100% {
    transform: translate(8px, 6.75px);
  }
`;

const bottomAnimation = keyframes`
  0% {
    transform: translate(8px, 9.25px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  20% {
    transform: translate(8px, 11.25px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  36% {
    transform: translate(8px, 10.25px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  52% {
    transform: translate(8px, 11.25px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  68% {
    transform: translate(8px, 10.25px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  84% {
    transform: translate(8px, 11.25px);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  100% {
    transform: translate(8px, 9.25px);
  }
`;

const PauseIcon = styled(PauseIconBase)`
  #top {
    animation: ${topAnimation} 2500ms linear infinite normal forwards;
  }
  #bottom {
    animation: ${bottomAnimation} 2500ms linear infinite normal forwards;
  }
`;

export default PauseIcon;
