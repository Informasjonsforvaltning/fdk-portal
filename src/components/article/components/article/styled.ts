import styled from 'styled-components';
import ArticleItemSC from '../../../article-item/styled';

const Article = styled.article`
    margin-top: 3em;
    display: flex;
    flex-flow: column;
    font-size: 1rem;
    word-wrap: break-word;
    
    @media (min-width: 992px) {
      margin-top: 6em;
    }
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

const AsideContent = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralLighter};
  border-radius: 5px;
  padding: 3em;

  ${ArticleItemSC.ArticleItem} {
    font-size: 1.5rem;
  }
`;

export default {
  Article,
  Date,
  Title,
  Abstract,
  Body,
  FullWidthImage,
  Video,
  AsideContent
};
