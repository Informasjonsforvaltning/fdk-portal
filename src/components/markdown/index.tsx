import React, { FC, PropsWithChildren } from 'react';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const Markdown: FC<PropsWithChildren<any>> = ({ children }) => (
  <ReactMarkdown remarkPlugins={[gfm]}>{children}</ReactMarkdown>
);

export default Markdown;
