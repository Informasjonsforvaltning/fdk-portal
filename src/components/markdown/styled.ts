import styled from 'styled-components';
import ReactMarkdownBase from 'react-markdown';

const ReactMarkdown = styled(ReactMarkdownBase)`
  p {
    padding-bottom: 1em;
  }

  ol > li {
    list-style: decimal outside none;
    display: list-item;
    margin-left: 1.2em;
  }

  ul > li {
    list-style: disc outside none;
    display: list-item;
    margin-left: 1.2em;
  }

  ul > li.task-list-item {
    list-style: none;
    margin-left: 0;
  }
`;

export default {
  ReactMarkdown
};
