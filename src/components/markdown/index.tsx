import React, { FC } from 'react';
import { compose } from 'redux';

import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

import SC from './styled';

import withErrorBoundary from '../with-error-boundary';

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
    <SC.ReactMarkdown remarkPlugins={[gfm]} skipHtml>
      {children}
    </SC.ReactMarkdown>
  );

const Fallback: FC<Props> = ({ allowHtml, children }) =>
  // eslint-disable-next-line react/jsx-no-useless-fragment
  allowHtml ? <>{parse(sanitizeHtml(children))}</> : <>{children}</>;

export default compose<FC<Props>>(withErrorBoundary(Fallback, false))(Markdown);
