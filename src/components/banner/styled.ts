import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: flex-start;
  color: #2d3741;
  background-color: #ffffff;
  overflow-wrap: break-word;
  height: 160px;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-wrap: break-word;
  flex-grow: 1;
  align-self: center;
  justify-content: center;
  font-size: 30px;
`;

const SvgEllipse = styled.div`
  position: absolute;
  padding-top: 1.6rem;

  @media screen and (max-width: 600px) {
    .svgEllipse {
      display: none;
    }
  }

  @media (max-width: 1620px) {
    .svgEllipse {
      position: relative;
    }
`;

export default {
  SvgEllipse,
  Container,
  TitleContainer
};
