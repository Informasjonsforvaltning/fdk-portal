import styled from 'styled-components';

const Article = styled.section`
    display: flex;
    flex-flow: column;
    font-size: 1rem;
    word-wrap: break-word;
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.neutralDark};
  font-size: 1.6em;
  margin-bottom: 0.5em;
`;

const Title = styled.h1`
  font-size: 3em;
`;

const Abstract = styled.p`
  font-size: 2em;
  line-height: 1.6em;
  font-weight: 400;
`;

const Body = styled.p`
  font-size: 1.6em;
`;

const FullWidthImage = styled.img`
  border-radius: 5px;
  height: auto;
  margin-bottom: 4em;
  max-width: 100%;
`;

const Video = styled.div`
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

export default {
  Article,
  Date,
  Title,
  Abstract,
  Body,
  FullWidthImage,
  Video
};
