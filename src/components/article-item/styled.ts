import styled, { css } from 'styled-components';

const Title = styled.h3`
  font-size: 1.5em;
  margin-top: 0.2em;
`;

const ArticleItem = styled.article`
  display: flex;
  flex-flow: column;
  font-size: 1.6rem;
  margin-bottom: 2em;
  word-break: break-word;
  & > a {
    color: ${({ theme }) => theme.colors.neutralDarker};
    text-decoration: none;
    &:hover {
      ${Title} {
        text-decoration: underline;
      }
    }
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.neutralDark};
`;

const Abstract = styled.p`
  margin: 0;
`;

const Image = styled.div<{ imageUrl?: string }>`
  background-image: url(../../img/illustration-article-placeholder.svg);
  ${({ imageUrl }) =>
    imageUrl &&
    css`
      background-image: url(${imageUrl});
    `}
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  margin-bottom: 1em;
  padding-top: 50%;
  overflow: hidden;
`;

export default {
  ArticleItem,
  Date,
  Title,
  Abstract,
  Image
};
