import styled from 'styled-components';

const Video = styled.p`
  padding: 56.25% 0 0 0;
  position: relative;

  & > iframe {
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default { Video };
