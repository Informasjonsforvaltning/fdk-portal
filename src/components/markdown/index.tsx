import React, { FC } from 'react';

import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import SC from './styled';

interface Props {
  allowHtml?: boolean;
  children: string;
}

const Markdown: FC<Props> = ({ allowHtml, children }) =>
  allowHtml ? (
    <SC.ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
      {children}
    </SC.ReactMarkdown>
  ) : (
    <SC.ReactMarkdown remarkPlugins={[gfm]}>{children}</SC.ReactMarkdown>
  );
export default Markdown;
