import styled from 'styled-components';

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

export default {
  ArticleItem,
  Date,
  Title,
  Abstract
};
