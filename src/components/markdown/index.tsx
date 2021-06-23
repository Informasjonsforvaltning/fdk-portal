import React, { FC } from 'react';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface Props {
  text: string;
}

const Markdown: FC<Props> = ({ text }) => (
  <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>
);

export default Markdown;
