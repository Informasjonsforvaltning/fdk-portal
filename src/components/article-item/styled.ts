import styled, { css } from 'styled-components';

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.2em 0;
`;

const ArticleItem = styled.article`
  display: flex;
  flex-flow: column;
  font-size: 1.6rem;
  margin-bottom: 2em;
  word-break: break-word;
  & > a {
    color: ${({ theme }) => theme.extendedColors.neutralDarker};
    text-decoration: none;
    &:hover {
      ${Title} {
        text-decoration: underline;
      }
    }
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.extendedColors.neutralDarker};
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
