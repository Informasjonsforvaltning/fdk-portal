import styled from 'styled-components';
import ArticleItemSC from '../../../article-item/styled';

const Article = styled.article`
    display: flex;
    flex-flow: column;
    font-size: 1rem;
    word-wrap: break-word;
  }
`;

const Date = styled.div`
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
  AsideContent
};
