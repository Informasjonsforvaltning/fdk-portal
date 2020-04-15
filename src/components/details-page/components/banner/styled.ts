import styled from 'styled-components';

const Banner = styled.header`
  display: flex;
  width: 100%;
  padding: 18px;
  border-radius: 5px;
  color: ${({ theme }) => theme.entityColours.dark};
  background: ${({ theme }) => theme.entityColours.light};

  & svg > path {
    fill: ${({ theme }) => theme.entityColours.dark};
  }

  & > svg {
    height: 42px;
    width: 42px;
    min-height: 42px;
    min-width: 42px;
  }
`;

const Content = styled.div`
  margin-left: 12px;
`;

const Title = styled.h1`
  display: flex inline;
  margin: 0;
  line-height: 42px;
  font-size: 42px;
  font-weight: bold;

  svg {
    height: 24px;
    width: 24px;
    min-height: 24px;
    min-width: 24px;
    margin-left: 12px;
    margin-top: -3px;
  }

  div {
    display: inline;
  }
`;

const LastPublishedInfo = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 20px;
`;

export default { Banner, Content, Title, LastPublishedInfo };
